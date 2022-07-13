import inspect from "vite-plugin-inspect";
import localPackageWatch from "./scripts/local-pkg-watch/index.js";
import path from "path";
import { strawberry } from "./src/lib/build/vite-plugin-strawberry.js";
import { sveltekit } from "@sveltejs/kit/vite";
import { sveltekitPluginDtl } from "sitgent/plugin";

const _filename = new URL(import.meta.url).pathname;
const _dirname = path.dirname(_filename);

function resolve(pathname) {
    return path.resolve(_dirname, pathname);
}

/** @type {import('vite').UserConfig} */
const config = {
    plugins: [
        inspect(),
        localPackageWatch(),
        strawberry({
            appDir: "app",
        }),
        sveltekit(),
        sveltekitPluginDtl(),
    ],
    resolve: {
        alias: {
            "~@css": resolve("./src/lib/css/"),
            "~@components": resolve("./src/lib/components/"),
            "~@utils": resolve("./src/lib/utils/"),
            "@kwangure/strawberry/css/styles": resolve("./src/lib/css/styles.js"),
        },
    },
};

export default config;
