/* eslint-disable camelcase */
import { mkdirp, rimraf } from "./filesystem.js";
import config from "../svelte.config.js";
import fs from "fs";
import path from "path";
import { preprocess } from "svelte/compiler";

const packageDir = "package";
const dirs = [
    "components",
    "config",
    "css",
    "utils",
];

make_package();

/**
 * @param {import('types/config').ValidatedConfig} config
 * @param {string} cwd
 */
export async function make_package() {
    const cwd = process.cwd();
    rimraf(path.join(cwd, packageDir));

    // const files_filter = create_filter(config.kit.package.files);
    // const exports_filter = create_filter(config.kit.package.exports);

    const files = walk(cwd, dirs);

    const pkgPath = path.join(cwd, "package.json");
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));

    const package_pkg = {
        name: pkg.name,
        version: pkg.version,
        description: pkg.description,
        keywords: pkg.keywords,
        homepage: pkg.homepage,
        bugs: pkg.bugs,
        license: pkg.license,
        author: pkg.author,
        contributors: pkg.contributors,
        funding: pkg.funding,
        repository: pkg.repository,
        dependencies: pkg.dependencies,
        private: pkg.private,
        publishConfig: pkg.publishConfig,
        type: "module",
        /** @type {Record<string, string>} */
        exports: {
            "./package.json": "./package.json",
        },
    };

    for (const file of files) {
        // if (!files_filter(file)) continue;

        const filename = path.join(cwd, file);
        const source = fs.readFileSync(filename, "utf8");

        const ext = path.extname(file);
        const svelteExtensions = [".svelte"];
        const svelte_ext = svelteExtensions.find((ext) => file.endsWith(ext)); // unlike `ext`, could be e.g. `.svelte.md`

        /** @type {string} */
        let out_file;

        /** @type {string} */
        let out_contents;

        if (svelte_ext) {
            // it's a Svelte component
            // TODO how to emit types?
            out_file = `${file.slice(0, -svelte_ext.length)}.svelte`;
            out_contents = config.preprocess
                ? (await preprocess(source, config.preprocess, { filename })).code
                : source;
        } else if (ext === ".ts" && !file.endsWith(".d.ts")) {
            out_file = `${file.slice(0, -".ts".length)}.js`;
            out_contents = await transpile_ts(filename, source);
        } else {
            out_file = file;
            out_contents = source;
        }

        write(path.join(cwd, packageDir, out_file), out_contents);


    }

    write(
        path.join(cwd, packageDir, "package.json"),
        JSON.stringify(package_pkg, null, "  ")
    );

    const project_readme = path.join(cwd, "README.md");
    const package_readme = path.join(cwd, packageDir, "README.md");

    if (fs.existsSync(project_readme) && !fs.existsSync(package_readme)) {
        fs.copyFileSync(project_readme, package_readme);
    }
}

/**
 * @param {string} filename
 * @param {string} source
 */
async function transpile_ts(filename, source) {
    const ts = await try_load_ts();
    return ts.transpileModule(source, {
        compilerOptions: load_tsconfig(filename, ts),
        fileName: filename,
    }).outputText;
}

async function try_load_ts() {
    try {
        return (await import("typescript")).default;
    } catch (e) {
        throw new Error("You need to install TypeScript if you want to transpile TypeScript files and/or generate type definitions");
    }
}

/**
 * @param {string} filename
 * @param {import('typescript')} ts
 */
function load_tsconfig(filename, ts) {
    const filedir = path.dirname(filename);
    const tsconfig_filename = ts.findConfigFile(filedir, ts.sys.fileExists);

    if (!tsconfig_filename) {
        throw new Error("Failed to locate tsconfig or jsconfig");
    }

    const { error, config } = ts.readConfigFile(tsconfig_filename, ts.sys.readFile);

    if (error) {
        throw new Error("Malformed tsconfig");
    }

    // Do this so TS will not search for initial files which might take a while
    config.include = [];
    config.files = [];
    const { options } = ts.parseJsonConfigFileContent(
        config,
        ts.sys,
        path.dirname(tsconfig_filename),
        { sourceMap: false },
        tsconfig_filename
    );
    return options;
}

/**
 * @param {string} cwd
 * @param {string | string[]} dirs
 */
function walk(cwd, dirs) {
    if (typeof dirs === "string") dirs = [dirs];
    /** @type {string[]} */
    const all_files = [];

    /** @param {string} dir */
    function walk_dir(dir) {
        const files = fs.readdirSync(path.join(cwd, dir));

        for (const file of files) {
            const joined = path.join(dir, file);
            const stats = fs.statSync(path.join(cwd, joined));

            if (stats.isDirectory()) {
                walk_dir(joined);
            } else {
                all_files.push(joined);
            }
        }
    }

    for (const dir of dirs) {
        walk_dir(dir)
    }

    return all_files;
}

/**
 * @param {string} file
 * @param {string} contents
 */
function write(file, contents) {
    mkdirp(path.dirname(file));
    fs.writeFileSync(file, contents);
}
