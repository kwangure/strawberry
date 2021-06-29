import escapeStringRegexp from "escape-string-regexp";
import { readFileSync } from "fs";
import sveltedoc from "@kwangure/svelte-docs";

export default function docs(opts = {}) {
    opts = Object.assign({}, { prefix: "docs" }, opts);

    const prefix = `${opts.prefix}:`;
    const postfix = ".svelte-doc";
    const docFiles = new Map();

    function cleanId(id) {
        return id
            .replace(new RegExp(`^${escapeStringRegexp(prefix)}`), "")
            .replace(new RegExp(`${escapeStringRegexp(postfix)}$`), "");
    }

    function affixId(id) {
        return `${prefix}${id}${postfix}`;
    }

    return {
        name: "svelte-docs",
        async resolveId(id, importer) {
            if (!id.startsWith(prefix)) return;

            const path = cleanId(id);
            const resolved = await this.resolve(path, importer);
            if (!resolved) {
                throw Error(`Cannot find module '${path}' from '${importer}'`);
            }

            // Add custom postfix to path to avoid conflicts with Svelte plugin
            return affixId(resolved.id);
        },

        load(id) {
            if (!id.startsWith(prefix)) return;

            return readFileSync(cleanId(id), { encoding: "utf-8" });
        },

        async transform(code, id) {
            if (!id.startsWith(prefix)) return;

            const realFilepath = cleanId(id);
            const docs = await sveltedoc({
                filename: realFilepath,
                fileContent: code,
                version: 3,
            });
            const { description, name, data: props, slots } = docs;
            const jsExports
= `export default ${JSON.stringify({ description, name, props, slots })};
export const description = "${description}";
export const name = "${name}";
export const props = ${JSON.stringify(props)};
export const slots = ${JSON.stringify(slots)};`;

            docFiles.set(realFilepath, jsExports);

            return {
                code: jsExports,
                map: null,
            };
        },

        // TODO: Compare compile results to only reload when docs have changed
        handleHotUpdate(hmrContext) {
            const { file, server } = hmrContext;
            const isDocFile = docFiles.has(file);

            if (!isDocFile) return;

            const docModule = server.moduleGraph.getModuleById(affixId(file));

            return [docModule];
        },
    };

}
