import adapter from "@sveltejs/adapter-static";
import docs from "./scripts/vite-plugin-svelte-docs.js";
import { fileURLToPath } from "url";
import inlineImport from "./scripts/preprocess-css-inline-import.js";
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
            // TODO: Uncomment and rewrite `pkg.exports` after https://github.com/sveltejs/kit/issues/1944 is resolved
            // exports: {
            //     exclude: [
            //         "components/**/*.svelte",
            //         "components/**/*.css",
            //         "utils/**",
            //     ],
            // },
            files: {
                include: ["components/**", "css/**", "utils/**", "config/**"],
                exclude: ["**/docs.js", "components/**/*.css"],
            },
        },
        paths: {
            base: PROD ? "/strawberry" : "",
        },
        target: "#svelte",
        vite: {
            plugins: [
                docs({
                    include: "src/lib/components/**",
                }),
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
