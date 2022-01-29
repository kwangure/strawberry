import { parse, walk } from "svelte/compiler";
import { transform, formatMessages } from 'esbuild';
import MagicString from "magic-string";
import { buildTemplate, serveTemplate } from "./template.js";

const THEME_UPDATE = "@theme-update";
const META = "___REPLACABLE_STRING___";

// TODO: get from package.json
const BERRY_THEME = "@kwangure/strawberry/css/Theme";

const isThemer = (id) => id.startsWith(BERRY_THEME) || id.startsWith(`/${BERRY_THEME}`);

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

class ThemeManifest {
    constructor() {
        this.manifest = new Map();
    }
    set(file, theme, mode, properties) {
        // Index themes on files so that if we transform it
        // than once we replace all its styles easily
        let themes = this.manifest.get(file);
        if (!themes) {
            themes = new Map();
            this.manifest.set(file, themes);
        }

        let modes = themes.get(theme);
        if (!modes) {
            modes = { dark: "", light: "" };
            themes.set(theme, modes);
        }

        modes[mode] = properties;
    }
    has(file) {
        return this.manifest.has(file);
    }
    getAllThemes() {
        const theme_manifest = new Map();
        for (const themes of this.manifest.values()) {
            for (const [theme, { dark, light }] of themes) {
                let modes = theme_manifest.get(theme);
                if (!modes) {
                    modes = { dark: "", light: "" };
                    theme_manifest.set(theme, modes);
                }
                modes.dark += dark;
                modes.light += light;
            }
        }
        return theme_manifest;
    }
}

export default function darkmode(options = {}) {
    const manifest = new ThemeManifest();

    let command, is_dev, server, config;
    // TODO: remove deleted files from manifest during dev
    // server.watcher.on('remove', update_manifest);
    return [
        {
            name: "sveltekit-darkmode-pre",
            enforce: "pre",
            configResolved(resolvedConfig) {
                config = resolvedConfig;
                command = resolvedConfig.command;
                is_dev = resolvedConfig.mode === "development";
            },
            configureServer(viteServer) {
                server = viteServer;
            },
            resolveId(id) {
                if (isThemer(id)) {
                    if (id.endsWith(".svelte")) return id;
                    return `/${id}.svelte`;
                }
            },
            async load(id) {
                if (isThemer(id)) {
                    if (command === "serve") {
                        const all_themes = manifest.getAllThemes();
                        const styles = Object.fromEntries(all_themes);
                        return serveTemplate({ update_event: THEME_UPDATE, styles });
                    } else if (command === "build") {
                        return buildTemplate({ placeholder: META });
                    }
                }
            },
            async transform(code, id) {
                if (!id.endsWith(".svelte")) return;

                const magic_string = new MagicString(code);
                const { css } = parse(code);

                const exports = getThemeExports(css);
                if (exports.size === 0) return;

                for (const [theme, { dark, light }] of exports) {
                    let dark_css = "";
                    let light_css = "";
                    if (light) {
                        light_css = magic_string.slice(light.block.start, light.block.end);
                        magic_string.remove(light.rule.start, light.rule.end);
                    }
                    if (dark) {
                        dark_css = magic_string.slice(dark.block.start, dark.block.end);
                        magic_string.remove(dark.rule.start, dark.rule.end);
                    }
                    manifest.set(id, theme, "dark", dark_css);
                    manifest.set(id, theme, "light", light_css);
                }

                if (is_dev) {
                    const { ws } = server;
                    const data = Object.fromEntries(manifest.getAllThemes());
                    ws.send({ type: "custom", event: THEME_UPDATE, data });
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
                const themes = manifest.getAllThemes();
                const theme_paths = {};
                for (const [theme, { dark, light }] of themes) {
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
                        paths.dark = `${config.base}${this.getFileName(dark_ref)}`;
                    }

                    if (mini_light) {
                        const light_ref = this.emitFile({
                            type: "asset",
                            name: `${theme}.dark.css`,
                            source: mini_light,
                        });
                        paths.light = `${config.base}${this.getFileName(light_ref)}`;
                    }

                    theme_paths[theme] = paths;
                }

                const result = JSON.stringify(theme_paths)
                magic_string.overwrite(to_replace, to_replace + META.length, result);

                return {
                    code: magic_string.toString(),
                    map: magic_string.generateMap(),
                };
            },
        },
        // Handle HMR after vite-plugin-svelte
        {
            name: "sveltekit-darkmode",
            async handleHotUpdate(context) {
                const { file, modules, server: { moduleGraph }} = context;
                if (!manifest.has(file)) return;
                const svelte_module = moduleGraph.getModuleById(file);

                return [...new Set([...modules, svelte_module])];
            },
        }
    ];
}