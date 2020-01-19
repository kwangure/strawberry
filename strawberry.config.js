const sveltePreprocess = require("svelte-preprocess");
const cssImport = require("postcss-import");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");

module.exports = {
    preprocess: sveltePreprocess({
        postcss: {
            plugins: [
                cssImport(),
                autoprefixer(),
                cssnano({
                    preset: 'default',
                }),
            ],
        },
    }),
}