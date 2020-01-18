const sveltePreprocess = require("svelte-preprocess");
const cssImport = require("postcss-import");
const autoprefixer = require("autoprefixer");

module.exports = {
    preprocess: sveltePreprocess({
        postcss: {
            plugins: [
                autoprefixer(),
                cssImport(),
            ],
        },
    }),
}