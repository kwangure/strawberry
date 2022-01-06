import { parse, walk } from "svelte/compiler";
import MagicString from "magic-string";
import path from "path";
import vite from "vite";

export function prebundle(options = {}) {
    const {
        outDir: out_dir = "package",
        rootDir: root_dir = "src/lib",
    } = options;
    return {
        async markup(input) {
            const { content, filename } = input;
            const s = new MagicString(content, { filename });
            const { module, instance } = parse(content);

            const imports = new Map();

            if (!filename.includes("Code.svelte")) return;

            [module, instance].forEach((script) => walk(script, {
                enter(node) {
                    const { type, source } = node;
                    if (
                        type === "ImportDeclaration"
                        && source.value.startsWith("prebundle:")
                    ) {
                        const { import_identifiers, bundle_entry } = get_import(node, s);
                        imports.set(path.resolve(import_identifiers), {
                            end: node.end,
                            import_string: bundle_entry,
                            import_identifiers,
                            start: node.start,
                        });
                    }
                },
            }));

            const bundles = await bundle_imports({ imports, out_dir });

            // This is where we expect `svelte-kit package` to output the svelte file inside `out_dir`
            // e.g. components/Code/
            const file_dest = path
                .relative(path.resolve(root_dir), path.dirname(filename));

            // /[cwd]/[out_dir]/components/Code/
            const file_dest_absolute = path.resolve(out_dir, file_dest);
            for (const { end, import_identifiers, filename, start } of bundles) {
                // e.g [cwd]/[out_dir]/bundle/bundle.js
                const preprocess_dest = path.resolve(out_dir, filename);
                const module_path = `import ${import_identifiers} from "${path.relative(file_dest_absolute, preprocess_dest)}"`;

                s.overwrite(start, end, module_path);
            }

            return {
                code: s.toString(),
                map: s.generateMap(),
            };
        },
    };
}

function get_import(import_ast, magic_string) {
    const import_string = magic_string
        .slice(import_ast.start, import_ast.end)
        .replace("prebundle:", "");
    const bundle_entry = [import_string];
    const import_identifiers = [];
    walk(import_ast, {
        enter(node) {
            /*  Consider:
                1) import * as thing from "./module.js"
                2) export { thing as default };
                3) export default thing;
                Potential gotcha is that 1 and 2 are live bindings. If they change in the module
                after import, they change in the importer too. They're a reference.
                3 simply assigns the initial value, but have decoupled lifetimes afterwards.
                Read more here https://jakearchibald.com/2021/export-default-thing-vs-thing-as-default/
            */
            let name;
            switch (node.type) {
                case "ImportDefaultSpecifier"/* import specifier from "path"; */:
                case "ImportNamespaceSpecifier"/* import * as specifier from "path"; */:
                    name = node.local.name;
                    bundle_entry.push(`export { ${name} as default };`);
                    import_identifiers.push(name);
                    this.skip();
                    break;
                case "ImportSpecifier"/* import { specifier } from "path"; */: {
                    name = node.local.name;
                    bundle_entry.push(`export { ${node.local.name} };`);
                    import_identifiers.push(`{ ${name} }`);
                    this.skip();
                    break;
                }
                default:
                    console.log(node.type);
                    break;
            }
        },
    });

    return {
        bundle_entry: bundle_entry.join("\n"),
        import_identifiers: import_identifiers.join(", "),
    };
}

async function bundle_imports(options) {
    const { imports, out_dir } = options;
    const { output }  = await vite.build({
        build: {
            outDir: out_dir,
            assetsDir: "bundle",
            minify: false,
            rollupOptions: {
                input: [...imports.keys()],
                plugins: [{
                    resolveId(id) {
                        if (imports.has(id)) return id;
                    },
                    load(id) {
                        const import_data = imports.get(id);
                        if (import_data) {
                            return {
                                code: import_data.import_string,
                            };
                        }
                    },
                }],
                preserveEntrySignatures: true,
            },
        },
    });

    const result = [];
    for (const chunk of output) {
        if (chunk.isEntry) {
            const { facadeModuleId: id, fileName: filename } = chunk;
            const { end, import_identifiers, start } = imports.get(id);
            result.push({ end, filename, import_identifiers, start })
        }
    }

    return result;
}
