/* global require, module */
const sveltePreprocess = require("svelte-preprocess");
const cssnano = require("cssnano");
const cssImport = require("postcss-import");
const cssVars = require("postcss-custom-properties");

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
