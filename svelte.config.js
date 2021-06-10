import adapter from "@sveltejs/adapter-static";
import { fileURLToPath } from "url";
import path from "path";
import { preprocessConfig } from "./config/index.cjs";
import sveltePreprocess from "svelte-preprocess";

const MODE = process.env.NODE_ENV;
const DEV = MODE === "development";
const PROD = MODE === "production";

export const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import("@sveltejs/kit").Config} */
export default {
    preprocess: sveltePreprocess({
        postcss: {
            plugins: [...preprocessConfig.postcss.plugins],
        },
    }),
    kit: {
        appDir: "app",
        adapter: adapter(),
        paths: {
            base: PROD ? "/strawberry" : "",
        },
        target: "#svelte",
        vite: {
            resolve: {
                alias: {
                    "~@css": path.resolve(__dirname, "./css/"),
                    "~@components": path.resolve(__dirname, "./components/"),
                    "~@utils": path.resolve(__dirname, "./utils/"),
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
