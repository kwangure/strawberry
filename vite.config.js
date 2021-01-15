const { preprocessConfig } = require("./config/index.js");
const svelte = require("rollup-plugin-svelte-hot");

module.exports = ({ _command, mode }) => {
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
