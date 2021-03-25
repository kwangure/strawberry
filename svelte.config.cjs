const node = require("@sveltejs/adapter-node");
const pkg = require("./package.json");
const { preprocessConfig } = require("./config/index.js");

/** @type {import('@sveltejs/kit').Config} */
module.exports = {
    // Consult https://github.com/sveltejs/svelte-preprocess
    // for more information about preprocessors
    preprocess: preprocessConfig,
    kit: {
        // By default, `npm run build` will create a standard Node app.
        // You can create optimized builds for different platforms by
        // specifying a different adapter
        adapter: node(),
        files: {
            routes: "site/routes",
            template: "site/app.html",
        },
        // hydrate the <div id="svelte"> element in src/app.html
        target: "#svelte",
        vite: {
            resolve: {
                alias: {
                    "$css": "/css",
                    "$components": "/components",
                    "$utils": "/utils",
                },
            },
            ssr: {
                noExternal: Object.keys(pkg.dependencies || {}),
            },
        },
    },
};
