import adapter from "@sveltejs/adapter-static";
import docs from "@kwangure/svelte-docs";
import { fileURLToPath } from "url";
import { prebundle } from "./scripts/preprocess-prebundle.js";
import inlineImport from "./scripts/preprocess-css-inline-import.js";
import micromatch from 'micromatch';
import path from "path";

const MODE = process.env.NODE_ENV;
const PROD = MODE === "production";
if (MODE === undefined) {
    console.warn("[svelte.config.js] 'NODE_ENV' is undefined. Did you mean to set it to 'packaging'?\n");
}

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

function resolve(pathname) {
    return path.resolve(__dirname, pathname);
}

const is_highlightjs = micromatch.matcher("highlight.js/lib/**");
const preprocess = [
    docs(),
    prebundle({
        bundle: (filename) => MODE === "packaging"
            && is_highlightjs(filename),
    }),
    inlineImport,
];

/** @type {import("@sveltejs/kit").Config} */
export default {
    preprocess,
    kit: {
        appDir: "app",
        adapter: adapter(),
        package: {
            exports: (filepath) => {
                if (filepath.endsWith('.d.ts')) return false;

                const value = micromatch.isMatch(filepath, [
                    'components/**/index.js',
                    'css/**/*.(js|css)',
                    'utils/forward-events.js',
                ]);

                return value;
            },
            files: (filepath) => {
                return micromatch.some(filepath, [
                    'components/**',
                    'css/**',
                    'utils/**',
                ]) && !micromatch.some(filepath, [
                    "components/**/docs.js",
                    "components/**/*.css",
                ]);
            },
        },
        paths: {
            base: PROD ? "/strawberry" : "",
        },
        target: "#svelte",
        vite: {
            resolve: {
                alias: {
                    "~@css": resolve("./src/lib/css/"),
                    "~@components": resolve("./src/lib/components/"),
                    "~@utils": resolve("./src/lib/utils/"),
                },
            },
        },
    },
};
