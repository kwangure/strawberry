import parse from "@kwangure/svelte-docs";
import path from "path";
import { readFileSync } from "fs";

const DOCS_PREFIX = "/@docs-prefix";
const DOCS_POSTFIX = ":docs";

/**
 * @param [options] {Partial<import('.').Options>}
 * @returns {import('rollup').Plugin}
 */
export default function svelteDos(options = {}) {
    const { preprocess, exportName = "docs" } = options;

    const resolvedIds = new Set();
    return {
        name: "svelte-docs",
        enforce: "pre",
        resolveId(id, importer) {
            const extension = path.extname(id);
            if (extension === `.svelte${DOCS_POSTFIX}`) {
                if (id.startsWith(DOCS_PREFIX)) {
                    return id.slice(DOCS_PREFIX.length);
                }

                if (importer) {
                    const resolved = path.resolve(path.dirname(importer), id);
                    resolvedIds.add(resolved);
                    // Mark as a virtual module
                    return `${DOCS_PREFIX}${resolved}`;
                }
            }

            return null;
        },
        async load(id) {
            if (!id.endsWith(DOCS_POSTFIX)) return null;

            const idStart = id.startsWith(DOCS_PREFIX) ? DOCS_PREFIX.length : 0;
            const idEnd = id.length - DOCS_POSTFIX.length;
            const cleanId = id.slice(idStart, idEnd);

            const filename = path.relative(process.cwd(), cleanId);
            const docs = JSON.stringify(await parse({
                code: readFileSync(cleanId, { encoding: "utf-8" }),
                filename,
                preprocess,
            }));

            const code = `export const ${exportName} = JSON.parse(${JSON.stringify(docs)});`;

            return code;
        },
    };
}
