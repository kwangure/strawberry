import { buildTemplate, serveTemplate } from "./template.js";
import { transform, formatMessages } from 'esbuild';
import MagicString from "magic-string";
import jitOpenProps from "./open-props.cjs";
import parser from "css-tree/parser";
import walk from "css-tree/walker";

const THEME_UPDATE = "@theme-update";
const STYLE_REPLACE = "___REPLACABLE_STRING___";

const isOldThemer = (id) => /@kwangure\/strawberry\/css\/Theme/.test(id);
const isThemer = (id) => /@kwangure\/strawberry\/components\/Theme/.test(id);
const isCSS = (id) => /\.css($|\?)/.test(id);
const isSvelte = (id) => /\.svelte($|\?)/.test(id);

function isRule(node) {
    return node.type === "Rule";
}

function isPseudoSelector(node) {
    return node.type === "PseudoClassSelector";
}

function isClassSelector(node) {
    return node.type === "ClassSelector";
}

function isMediaFeature(node) {
    return node.type === "MediaFeature";
}

function isIdentifier(node) {
    return node.type === "Identifier";
}

const allowed_pseudoselectors = new Set(["root", "scope"]);
function getSelector(prelude, isSvelteFile) {
    let selector = "";
    walk(prelude, (node, nodeWrapper) => {
        if (isPseudoSelector(node)) {
            const { name } = node;
            if (!allowed_pseudoselectors.has(name)) {
                throw Error("Only ':scope', and ':root' pseudo-selectors are allowed in theme declarations");
            }

            if (name === "scope") {
                if (!isSvelteFile) {
                    throw Error("The 'scope' selector is only allowed in Svelte files");
                }
                if (
                    nodeWrapper.prev?.data
                    && isClassSelector(nodeWrapper.prev.data)
                ) {
                    // CSS notation for class
                    selector = `.${nodeWrapper.prev.data.name}`;
                } else {
                    throw Error("Please file an issue to reproduce. We shouldn't get here.");
                }
            } else {
                selector = ":root,:host";
            }

            return walk.break;
        }
    });

    return selector;
}

function getThemeRules(block, isSvelteFile) {
    let rules = [];
    walk(block, (node) => {
        if (!isRule(node)) return;
        const selector = getSelector(node.prelude, isSvelteFile);
        if (!selector) {
            throw Error("Invalid rule. Please file an issue telling us how we got here.");
        }

        rules.push([selector, {
            // Ignore curly braces of CSS block
            block: {
                start: node.block.loc.start.offset + 1,
                end: node.block.loc.end.offset - 1
            },
        }]);
    });
    return rules;
}

function getThemeNameAndColorScheme(prelude) {
    let mediaFeatures = new Map();
    walk(prelude, (node) => {
        if (isMediaFeature(node)) {
            mediaFeatures.set(node.name, node.value.name);
            return walk.skip;
        }
        if (isIdentifier(node)) {
            mediaFeatures.set(node.name, null);
            return walk.skip;
        }
    });

    if (!mediaFeatures.has("theme")) return null;
    let errors = [];

    let theme = mediaFeatures.get("theme");
    if (!theme) errors.push("Invalid theme name.");

    if (!mediaFeatures.has("and")) {
        errors.push("',' (comma) operator not supported.");
        errors.push("Missing 'and' operator.");
    };
    if (mediaFeatures.has("not")) {
        errors.push("'not' operator not supported.");
    }
    if (!mediaFeatures.has("prefers-color-scheme")) {
        errors.push("Missing 'prefers-color-scheme' declaration.");
    }

    if (errors.length) {
        const error = errors.join(" ");
        const usage = [
            `Usage:`,
            `    @media (theme: berry) and (prefers-color-scheme: dark) {`,
            `        :scope {`,
            `            --property: value;`,
            `        }`,
            `    }`,
        ].join("\n");
        throw Error(`${error}\n${usage}`);
    }

    return {
        theme: mediaFeatures.get("theme"),
        mode: mediaFeatures.get("prefers-color-scheme"),
    };
}

function getThemeExports(css, isSvelteFile) {
    const exports = new Map();

    walk(css, (node) => {
        if (node.type !== "Atrule" || node.name !== "media") return;
        const themeExport = getThemeNameAndColorScheme(node.prelude);
        if (!themeExport) return;
        const rules = getThemeRules(node.block, isSvelteFile);
        const { theme, mode } = themeExport;

        let modes = exports.get(theme);
        if (!modes) {
            modes = [];
            exports.set(theme, modes);
        }

        modes.push([mode, {
            rule: {
                start: node.loc.start.offset,
                end: node.loc.end.offset,
            },
            blocks: rules
                .map(([selector, { block }]) => ({ selector, block })),
        }]);
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
    return {
        name: "sveltekit-darkmode-pre",
        enforce: "pre",
        config() {
            return {
                css: {
                    postcss: {
                        // TODO: Fork JITProps to inject props into specific theme files only
                        // for smaller bundles

                        // only vars used are in build output
                        plugins: [jitOpenProps],
                    },
                },
                optimizeDeps: {
                    exclude: [
                        "@kwangure/strawberry/components/Theme",
                        "@kwangure/strawberry/components/Theme.svelte",
                    ],
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

            if (isOldThemer(id)) {
                throw "The 'Theme' component has moved to '@kwangure/strawberry/components/Theme'";
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

            const css = parser(code, { positions: true });
            const magicString = new MagicString(code);
            const isSvelteFile = isSvelte(id);
            const exports = getThemeExports(css, isSvelteFile);
            if (exports.size === 0) return;

            for (const [theme, modeDeclarations] of exports) {
                let dark_css = "";
                let light_css = "";

                for (const [mode, { blocks, rule }] of modeDeclarations) {
                    // We use the selectors as is e.g :root{ ... }
                    // Minfier will take care of merging repeated selectors etc.
                    for (const { selector, block } of blocks) {
                        const css = `${selector}{${magicString.slice(block.start, block.end)}}`;
                        if (mode === "light") {
                            light_css += css;
                        } else if (mode === "dark") {
                            dark_css += css;
                        }
                    }

                    magicString.remove(rule.start, rule.end);
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
                code: magicString.toString(),
                map: magicString.generateMap(),
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
    };
}