import adapter from "@sveltejs/adapter-static";
import docs from "./scripts/vite-plugin-svelte-docs.js";
import { fileURLToPath } from "url";
import inlineImport from "./scripts/preprocess-css-inline-import.js";
import match from 'micromatch';
import path from "path";

const MODE = process.env.NODE_ENV;
const PROD = MODE === "production";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

function resolve(pathname) {
    return path.resolve(__dirname, pathname);
}

/** @type {import("@sveltejs/kit").Config} */
export default {
    preprocess: inlineImport,
    kit: {
        appDir: "app",
        adapter: adapter(),
        package: {
            exports: (filepath) => {
                if (filepath.endsWith('.d.ts')) return false;

                const value = match.isMatch(filepath, [
                    'components/**/index.js',
                    'css/**/*.js',
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
                docs(),
            ],
            resolve: {
                alias: {
                    "~@css": resolve("./src/lib/css/"),
                    "~@components": resolve("./src/lib/components/"),
                    "~@utils": resolve("./src/lib/utils/"),
                },
            },
            optimizeDeps: {
                // Svelte-kit expects component dependencies to be ESM.
                // CJS deps fail unless included here.
                // ESM work is in progress for `highlight.js@12.0`.
                // TODO: Remove `highlight.js@12.0` from here once it's released.
                include: ["highlight.js"],
            },
        },
    },
};
