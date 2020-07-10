/* global require, module */
const sveltePreprocess = require("svelte-preprocess");
const cssnano = require("cssnano");
const cssVars = require("postcss-css-variables");

module.exports.preprocessConfig = sveltePreprocess({
    postcss: {
        plugins: [
            cssVars(),
            cssnano({
                preset: "default",
            }),
        ],
    },
});
