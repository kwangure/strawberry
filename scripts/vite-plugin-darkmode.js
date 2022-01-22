import * as svelte from "svelte/compiler";
import MagicString from "magic-string";

function isRule(node) {
    return node.type === "Rule";
}

function isPseudoSelector(node) {
    return node.type === "PseudoClassSelector";
}

const allowed_pseudoselectors = new Set(["dark", "light"]);
function getDarkmodeExport(prelude) {
    let export_type = "";
    svelte.walk(prelude, {
        enter(node) {
            if (isPseudoSelector(node) && allowed_pseudoselectors.has(node.name)) {
                export_type = node.name;
            }
        },
    });
    return export_type;
}


export function darkmode(options = {}) {
    const {} = options;

    const styles = {
        light: "",
        dark: "",
    };

    return {
        name: "darkmode",
        enforce: "pre",
        transform(code, id) {
            if (!id.endsWith(".svelte")) return;
            const { css } = svelte.parse(code);
            if (!css) return;

            const magic_string = new MagicString(code);
            svelte.walk(css, {
                enter(node) {
                    if (!isRule(node)) return;
                    let darkModeExport = getDarkmodeExport(node.prelude);
                    if (!darkModeExport) return;

                    styles[darkModeExport] += magic_string
                        // Ignore curly braces of CSS block
                        .slice(node.block.start + 1, node.block.end - 1);
                    magic_string.remove(node.start, node.end);
                }
            });

            return {
                code: magic_string.toString(),
                map: magic_string.generateMap(),
            };
        }
    };
}
