/* global require, module */
const sveltePreprocess = require("svelte-preprocess");
const cssImport = require("postcss-import");
const cssnano = require("cssnano");
const cssVars = require("postcss-css-variables");

module.exports.preprocessConfig = sveltePreprocess({
    postcss: {
        plugins: [
            cssImport(),
            cssVars(),
            cssnano({
                preset: "default",
            }),
        ],
    },
});
