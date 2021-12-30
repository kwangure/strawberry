import { parse, walk } from "svelte/compiler";
import MagicString from "magic-string";

/**
 * @typedef {Promise<{code: string; dependencies?: Array<string>}>} PreprocessResult
 */

export default {
    /**
     * @param {{
     *      content: string;
     *      markup: string;
     *      attributes: Record<string, string>,
     *      filename: string;
     * }} options
     * @returns {PreprocessResult}
     **/
    markup({ content, filename }) {
        const ast = parse(content).css;
        if (!ast) return;

        const s = new MagicString(content, { filename });

        walk(ast, {
            enter(node) {
                const { type, name, start, end } = node;
                if (!(type === "PseudoClassSelector" && name === "export")) return;
                if (node.children) {
                    throw Error("\
':export' pseudo-selector should not have nested selectors.\n\
Usage: \n\
1 |    :export {\n\
2 |        property: value;\n\
3 |    }".trim());
                }
                const replacement = ":root, :host";
                s.overwrite(start, end, replacement);
            },
        });

        return {
            code: s.toString(),
            map: s.generateMap(),
        };
    },
};
