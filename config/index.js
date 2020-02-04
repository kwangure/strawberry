const sveltePreprocess = require("svelte-preprocess");
const cssImport = require("postcss-import");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const cssVars = require("postcss-css-variables");

// for use with in Svelte projects
module.exports = sveltePreprocess({
    postcss: {
        plugins: [
            cssImport(),
            autoprefixer(),
            cssnano({
                preset: 'default',
            }),
        ],
    },
});

// custom elements config
module.exports.customElementsPreprocess = sveltePreprocess({
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
});