import { buildTemplate, serveTemplate } from "./template.js";
import { transform, formatMessages } from 'esbuild';
import MagicString from "magic-string";
import parser from "css-tree/parser";
import walk from "css-tree/walker";

const THEME_UPDATE = "@theme-update";
const STYLE_REPLACE = "___REPLACABLE_STRING___";

const isThemer = (id) => /@kwangure\/strawberry\/css\/Theme/.test(id);
const isCSS = (id) => /\.css($|\?)/.test(id);

function isPseudoSelector(node) {
    return node.type === "PseudoClassSelector";
}

function getThemeExport(prelude) {
    let themeExport = [];
    walk(prelude, (node, parent) => {
        if (isPseudoSelector(node) && node.name === "theme") {
            let error = [];

            let [theme, mode] = node.children.head.data.value.split(",");
            [theme, mode] = [theme?.trim(), mode?.trim()]
            if (!theme) {
                error.push("Missing theme.");
            } else if (!mode) {
                error.push("Missing mode");
            } else {
                const className = parent.prev?.data.name;
                themeExport = [theme, mode, className ? `.${className}` : ":root, :host"];
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
    });
    return themeExport;
}

function getThemeExports(css) {
    const exports = new Map();

    walk(css, (node) => {
        if (node.type !== "Rule") return;
        const themeExport = getThemeExport(node.prelude);
        if (!themeExport.length) return;

        const [theme, mode, selector] = themeExport;

        let modes = exports.get(theme);
        if (!modes) {
            modes = {};
            exports.set(theme, modes);
        }

        Object.assign(modes, {
            selector,
            [mode]: {
                rule: {
                    start: node.loc.start.offset,
                    end: node.loc.end.offset,
                },
                // Ignore curly braces of CSS block
                block: {
                    start: node.block.loc.start.offset + 1,
                    end: node.block.loc.end.offset - 1
                },
            },
        });
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

export function strawberry(options = {}) {
    const manifest = new ThemeManifest();

    let command, is_dev, server, config;
    // TODO: remove deleted files from manifest during dev
    // server.watcher.on('remove', update_manifest);
    return [
        {
            name: "sveltekit-darkmode-pre",
            enforce: "pre",
            config() {
                return {
                    optimizeDeps: {
                        exclude: ["@kwangure/strawberry/css/Theme.svelte"],
                    },
                };
            },
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
                    return `${id}.svelte`;
                }
            },
            async load(id) {
                if (isThemer(id)) {
                    if (command === "serve") {
                        const all_themes = manifest.getAllThemes();
                        const styles = Object.fromEntries(all_themes);
                        return serveTemplate({ update_event: THEME_UPDATE, styles });
                    } else if (command === "build") {
                        return buildTemplate({ placeholder: STYLE_REPLACE });
                    }
                }
            },
            async transform(code, id) {
                if (!isCSS(id)) return;

                const magic_string = new MagicString(code);
                const css = parser(code, { positions: true });

                const exports = getThemeExports(css);
                if (exports.size === 0) return;

                for (const [theme, { dark, light, selector }] of exports) {
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
                    // We use the selector as is e.g :root{ ... }
                    // Minfier will take care of merging repeated selectors etc.
                    manifest.set(id, theme, "dark", `${selector}{${dark_css}}`);
                    manifest.set(id, theme, "light", `${selector}{${light_css}}`);
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
                const to_replace = code.indexOf(STYLE_REPLACE);
                if (to_replace < 0) return;

                const magic_string = new MagicString(code);
                const themes = manifest.getAllThemes();
                const theme_paths = {};
                for (const [theme, { dark, light }] of themes) {
                    const [mini_dark, mini_light] = await Promise.all([
                        dark && minifyCSS(dark, config),
                        light && minifyCSS(light, config),
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
                            name: `${theme}.light.css`,
                            source: mini_light,
                        });
                        paths.light = `${config.base}${this.getFileName(light_ref)}`;
                    }

                    theme_paths[theme] = paths;
                }

                const result = JSON.stringify(theme_paths)
                magic_string.overwrite(to_replace, to_replace + STYLE_REPLACE.length, result);

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
                const { file, modules, server: { moduleGraph } } = context;
                if (!manifest.has(file)) return;
                const svelte_module = moduleGraph.getModuleById(file);

                return [...new Set([...modules, svelte_module])];
            },
        }
    ];
}