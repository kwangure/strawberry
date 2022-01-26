import { parse, walk } from "svelte/compiler";
import MagicString from "magic-string";
import { transform, formatMessages } from 'esbuild';

const THEME_LIST = "@theme-list";
const META = "___REPLACABLE_STRING___";

const isThemeList = (id) => id.endsWith(THEME_LIST);

function isPseudoSelector(node) {
    return node.type === "PseudoClassSelector";
}

function getThemeExport(prelude) {
    let themeExport = [];
    walk(prelude, {
        enter(node) {
            if (isPseudoSelector(node) && node.name === "theme") {
                let error = [];
                if (!node.children.length) {
                    error.push("Missing theme name and mode.");
                } else {
                    let [theme, mode] = node.children[0].value.split(",");
                    [theme, mode] = [theme?.trim(), mode?.trim()]
                    if (!theme) {
                        error.push("Missing theme.");
                    } else if (!mode) {
                        error.push("Missing mode");
                    } else {
                        themeExport = [theme, mode];
                    }
                }
                if (error.length) {
                    throw Error(error.concat([
                        `Usage:`,
                        `     :theme(theme_name, light) {`,
                        `          --property: value;`,
                        `     }`
                    ]).join("\n"));

                }
            }
        },
    });
    return themeExport;
}

function getThemeExports(css) {
    const exports = new Map();

    walk(css, {
        enter(node) {
            if (node.type !== "Rule") return;
            const themeExport = getThemeExport(node.prelude);
            if (!themeExport.length) return;

            const [theme, mode] = themeExport;

            let modes = exports.get(theme);
            if (!modes) {
                modes = {};
                exports.set(theme, modes);
            }

            Object.assign(modes, {
                [mode]: {
                    rule: {
                        start: node.start,
                        end: node.end,
                    },
                    // Ignore curly braces of CSS block
                    block: {
                        start: node.block.start + 1,
                        end: node.block.end - 1
                    },
                },
            });
        },
    });

    return exports;
}

async function minifyCSS(css, config) {
    const { code, warnings } = await transform(css, {
        loader: 'css',
        minify: true,
        target: config.build.cssTarget || undefined
    });
    if (warnings.length) {
        const msgs = await formatMessages(warnings, { kind: 'warning' });
        const colored = colors
            .yellow(`warnings when minifying css:\n${msgs.join('\n')}`);
        config.logger.warn(colored);
    }
    return code;
}

export default function darkmode(options = {}) {
    const theme_properties = new Map();

    let config;
    return {
        name: "sveltekit-darmode",
        enforce: "pre",
        configResolved(resolvedConfig) {
            config = resolvedConfig;
        },
        resolveId(id) {
            if (isThemeList(id)) return id;
        },
        load(id) {
            if (isThemeList(id)) return `export default ${META};`;
        },
        transform(code, id) {
            if (!id.endsWith(".svelte")) return;

            const magic_string = new MagicString(code);
            const { css } = parse(code);

            const exports = getThemeExports(css);
            if (exports.size === 0) return;

            for (const [theme, { dark, light }] of exports) {
                // Index themes on file ids so that if we transform a file more
                // than once we replacing its styles easily
                let properties = theme_properties.get(id);
                if (!properties) {
                    properties = new Map();
                    theme_properties.set(id, properties);
                }
                properties.set(theme,  {
                    dark: dark
                        ? magic_string.slice(dark.block.start, dark.block.end)
                        : "",
                    light: light
                        ? magic_string.slice(light.block.start, light.block.end)
                        : "",
                });

                if (light) {
                    magic_string.remove(light.rule.start, light.rule.end);
                }
                if (dark) {
                    magic_string.remove(dark.rule.start, dark.rule.end);
                }
            }

            return {
                code: magic_string.toString(),
                map: magic_string.generateMap(),
            };
        },
        async renderChunk(code) {
            const to_replace = code.indexOf(META);
            if (to_replace < 0) return;
            const magic_string = new MagicString(code);

            const theme_CSS = new Map();
            for (const [id, properties] of theme_properties) {
                for (const [theme, { dark, light }] of properties) {
                    let modes = theme_CSS.get(theme);
                    if (!modes) {
                        modes = { dark: "", light: "" };
                        theme_CSS.set(theme, modes);
                    }
                    modes.dark += dark;
                    modes.light += light;
                }
            }

            const theme_paths = [];
            for (const [theme, { dark, light }] of theme_CSS) {
                const [ mini_dark, mini_light ] = await Promise.all([
                    dark && minifyCSS(`:root{${dark}}`, config),
                    light && minifyCSS(`:root{${light}}`, config),
                ]);

                const paths = {};
                if (mini_dark) {
                    const dark_ref = this.emitFile({
                        type: "asset",
                        name: `${theme}.dark.css`,
                        source: mini_dark,
                    });
                    paths.dark = this.getFileName(dark_ref);
                }

                if (mini_light) {
                    const light_ref = this.emitFile({
                        type: "asset",
                        name: `${theme}.dark.css`,
                        source: mini_light,
                    });
                    paths.light = this.getFileName(light_ref);
                }

                theme_paths.push([theme, paths]);
            }

            const result = [
                `new Map([`,
                ...theme_paths
                    .map(([theme, paths]) => `["${theme}", ${JSON.stringify(paths)}],`),
                `]);`
            ].join("");

            magic_string.overwrite(to_replace, to_replace + META.length, result);

            return {
                code: magic_string.toString(),
                map: magic_string.generateMap(),
            };
        },
    };
}