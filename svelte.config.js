import adapter from "@sveltejs/adapter-static";
import docs from "@kwangure/svelte-docs";
import { fileURLToPath } from "url";
import inlineImport from "./scripts/preprocess-css-inline-import.js";
import inspect from "vite-plugin-inspect";
import micromatch from 'micromatch';
import path from "path";
import { strawberry } from "./src/lib/build/vite-plugin-strawberry.js";

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

const appDir = "app";
const preprocess = [
    docs(),
    inlineImport,
];

/** @type {import("@sveltejs/kit").Config} */
export default {
    preprocess,
    kit: {
        appDir,
        adapter: adapter(),
        package: {
            exports: (filepath) => {
                if (filepath.endsWith('.d.ts')) return false;

                const value = micromatch.isMatch(filepath, [
                    'build/vite-plugin-strawberry.js',
                    'components/**/index.js',
                    'components/Code/languages/**/*.js',
                    'css/**/*.(js|css)',
                    'utils/forward-events.js',
                ]);

                return value;
            },
            files: (filepath) => {
                return micromatch.some(filepath, [
                    'build/**',
                    'components/**',
                    'css/**',
                    'utils/**',
                ]) && !micromatch.some(filepath, [
                    "components/**/docs.js",
                    "components/Input/css/**",
                ]);
            },
        },
        paths: {
            base: PROD ? "/strawberry" : "",
        },
        target: "#svelte",
        vite: {
            plugins: [
                inspect(),
                strawberry({
                    appDir,
                }),
            ],
            resolve: {
                alias: {
                    "~@css": resolve("./src/lib/css/"),
                    "~@components": resolve("./src/lib/components/"),
                    "~@utils": resolve("./src/lib/utils/"),
                    "@kwangure/strawberry/css/styles": resolve("./src/lib/css/styles.js"),
                },
            },
        },
    },
};
