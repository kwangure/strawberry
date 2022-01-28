import { parse, walk } from "svelte/compiler";
import { transform, formatMessages } from 'esbuild';
import MagicString from "magic-string";

const THEME_LIST = "@theme-list";
const THEME_CSS = "@theme-css.css";
const THEME_UPDATE = "@theme-update";
const META = "___REPLACABLE_STRING___";
const SEPARATOR = "_._";

const isThemeList = (id) => id.endsWith(THEME_LIST);
const isThemeCSS = (id) => id.includes(THEME_CSS);

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
    const app_dir = options.appDir;
    const theme_properties = new Map();

    let command, is_dev, server, theme_css_path;
    // vite.watcher.on('add', update_manifest);
    // vite.watcher.on('remove', update_manifest);
    return [
        {
            name: "sveltekit-darkmode-pre",
            enforce: "pre",
            configResolved(config) {
                command = config.command;
                is_dev = config.mode === "development";
            },
            configureServer(viteServer) {
                server = viteServer;
            },
            resolveId(id) {
                if (isThemeList(id)) return id;
                if (isThemeCSS(id)) {

                }
            },
            async load(id) {
                if (isThemeList(id)) {
                    let source = [];
                    if (command === "build") {
                        source = [
                            `export function getStylesheetStore(theme, mode) {`,
                            `    const themeMap = ${META};`,
                            `    return {`,
                            `        subscribe(fn) {`,
                            `           fn(themeMap.get(theme)[mode])};`,
                            `           return () => {};`,
                            `        }`,
                            `    };`
                                `}`,
                        ];
                    } else if (command === "serve") {
                        source = [
                            `export function getStylesheetStore(theme, mode) {`,
                            // Change string to force updates
                            `    let count = 0;`,
                            `    let cssPath = () => { `,
                            `        count += 1;`,
                            `        return \`\${theme}${SEPARATOR}\${mode}${SEPARATOR}\${count}${THEME_CSS}\`;`,
                            `    };`,
                            `    const subscribers = new Set();`,
                            `    if (import.meta.hot) {`,
                            `        import.meta.hot.on("${THEME_UPDATE}", (data) => {`,
                            `            for (const subscriber of subscribers) {`,
                            `                subscriber(cssPath());`,
                            `            }`,
                            `        });`,
                            `    }`,
                            `    return {`,
                            `        subscribe(fn) {`,
                            `            fn(cssPath());`,
                            `            subscribers.add(fn);`,
                            `            return () => subscribers.delete(fn);`,
                            `        },`,
                            `    };`,
                            `};`,
                        ];
                    } else {
                        config.logger.error(`Unknown Vite command. Unable to load '${id}.'`);
                    }

                    return source.join("\n");
                };
                if (isThemeCSS(id)) {
                    const [theme, mode] = id.slice("/".length).split(SEPARATOR);
                    let css = "";
                    for (const properties of theme_properties.values()) {
                        const modes = properties.get(theme);
                        if (Object.hasOwnProperty.call(modes, mode)) {
                            css += modes[mode];
                        }
                    }

                    theme_css_path = id;

                    return `:root{${css}};`;
                }
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
                    properties.set(theme, {
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

                if (is_dev && theme_properties.has(id)) {
                    const { moduleGraph, ws } = server;
                    const thisModule = moduleGraph.getModuleById(id);
                    if (thisModule.lastHMRTimestamp) {
                        ws.send({ type: 'custom', event: THEME_UPDATE });
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
                for (const properties of theme_properties.values()) {
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
                    const [mini_dark, mini_light] = await Promise.all([
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
                        paths.dark = `/${app_dir}/${this.getFileName(dark_ref)}`;
                    }

                    if (mini_light) {
                        const light_ref = this.emitFile({
                            type: "asset",
                            name: `${theme}.dark.css`,
                            source: mini_light,
                        });
                        paths.light = `/${app_dir}/${this.getFileName(light_ref)}`;
                    }

                    theme_paths.push({ theme, paths });
                }

                const result = [
                    `new Map([`,
                    ...theme_paths
                        .map((manifest) => {
                            const { theme, paths } = manifest;
                            return `["${theme}", ${JSON.stringify(paths)}]`;
                        }),
                    `]);`
                ].join("");

                magic_string.overwrite(to_replace, to_replace + META.length, result);

                return {
                    code: magic_string.toString(),
                    map: magic_string.generateMap(),
                };
            },
        },
        {
            name: "sveltekit-darkmode",
            async handleHotUpdate(context) {
                const { file, modules, server } = context;
                if (!theme_css_path || !theme_properties.has(file)) return;
                const svelteModule = server.moduleGraph.getModuleById(file);
                const themeModule = server.moduleGraph.getModuleById(theme_css_path);

                return [...new Set([...modules, svelteModule, themeModule])];
            },
        }
    ];
}