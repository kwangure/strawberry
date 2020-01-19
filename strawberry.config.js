const sveltePreprocess = require("svelte-preprocess");
const cssImport = require("postcss-import");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const cssVars = require("postcss-css-variables");

module.exports = {
    preprocess: sveltePreprocess({
        postcss: {
            plugins: [
                cssImport(),
                autoprefixer(),
                cssnano({
                    preset: 'default',
                }),
                cssVars(),
            ],
        },
    }),
}