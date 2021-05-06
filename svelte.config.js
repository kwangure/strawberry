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
        files: {
            routes: "site/routes",
            template: "site/app.html",
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
        },
    },
};
