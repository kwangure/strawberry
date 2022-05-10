import adapter from "@sveltejs/adapter-static";
import docs from "@kwangure/svelte-docs";
import { fileURLToPath } from "url";
import inlineImport from "./scripts/preprocess-css-inline-import.js";
import inspect from "vite-plugin-inspect";
import localPackageWatch from "./scripts/local-pkg-watch/index.js";
import micromatch from 'micromatch';
import path from "path";
import { strawberry } from "./src/lib/build/vite-plugin-strawberry.js";
import test from "sitgent/plugin";

const MODE = process.env.NODE_ENV;
const PROD = MODE === "production";

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
        vite: {
            plugins: [
                inspect(),
                strawberry({
                    appDir,
                }),
                localPackageWatch(),
                test(),
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
