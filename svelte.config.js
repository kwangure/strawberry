import adapter from "@sveltejs/adapter-static";
import docs from "./scripts/vite-plugin-svelte-docs.js";
import { fileURLToPath } from "url";
import { prebundle } from "./scripts/preprocess-prebundle.js";
import inlineImport from "./scripts/preprocess-css-inline-import.js";
import exportCustormProperties from "./scripts/preprocess-extract-custom-properties.js";
import match from 'micromatch';
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

const preprocess = [
    prebundle({
        bundle: MODE === "packaging"
            ? ["highlight.js/lib/core"]
            : []
    }),
    inlineImport,
    exportCustormProperties,
].filter(Boolean);

/** @type {import("@sveltejs/kit").Config} */
export default {
    preprocess,
    kit: {
        appDir: "app",
        adapter: adapter(),
        package: {
            exports: (filepath) => {
                if (filepath.endsWith('.d.ts')) return false;

                const value = match.isMatch(filepath, [
                    'components/**/index.js',
                    'css/**/*.(js|css)',
                    'utils/forward-events.js',
                ]);

                return value;
            },
            files: (filepath) => {
                return match.some(filepath, [
                    'components/**',
                    'css/**',
                    'utils/**',
                    'config/**',
                ]) && !match.some(filepath, [
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
            plugins: [
                docs({ preprocess }),
            ],
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
