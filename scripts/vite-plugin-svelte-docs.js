import { createFilter } from "@rollup/pluginutils";
import { isMalformed } from "./javascipt.js";
import parse from "@kwangure/svelte-docs";
import path from "path";
import { readFileSync } from "fs";

/**
 * @param [options] {Partial<import('.').Options>}
 * @returns {import('rollup').Plugin}
 */
export default function svelteDos(options = {}) {
    const { include, exclude, preprocess, exportName = "docs" } = options;
    const extensions = new Set(options.extensions || [".svelte"]);
    const filter = createFilter(include, exclude);

    return {
        name: "svelte-docs",

        // Adds a named export to `.js` file after the Svelte
        // extension has already compiled it.
        async transform(code, id) {
            if (!filter(id)) return null;

            const extension = path.extname(id);
            if (!extensions.has(extension)) return null;

            const filename = path.relative(process.cwd(), id);
            const docs = JSON.stringify(await parse({
                code: readFileSync(id, { encoding: "utf-8" }),
                filename,
                preprocess,
            }));

            // eslint-disable-next-line max-len
            code += `export const ${exportName} = JSON.parse(${JSON.stringify(docs)});`;
            const error = isMalformed(code);
            if (error) {
                // eslint-disable-next-line max-len
                throw Error(`Could not export documentation in '${filename}'. ${error.message}`);
            }

            return code;
        },
    };
}
