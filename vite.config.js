import { preprocessConfig } from "./config/index.js";
import svelte from "rollup-plugin-svelte-hot";

/**
 * @returns {import('vite').UserConfig}
 */
export default  ({ _command, mode }) => {
    return {
        plugins: [
            svelte({
                dev: mode === "development",
                preprocess: preprocessConfig,
                hydratable: true,
                hot: mode === "development",
            }),
        ],
        alias: {
            "$css": "/css",
            "$components": "/components",
            "$utils": "/utils",
        },
    };
};
