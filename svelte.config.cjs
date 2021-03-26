const node = require("@sveltejs/adapter-node");
const path = require("path");
const pkg = require("./package.json");
const { preprocessConfig } = require("./config/index.cjs");

/** @type {import('@sveltejs/kit').Config} */
module.exports = {
    preprocess: preprocessConfig,
    kit: {
        adapter: node(),
        files: {
            routes: "site/routes",
            template: "site/app.html",
        },
        target: "#svelte",
        vite: {
            resolve: {
                alias: {
                    "~@css": path.resolve(__dirname, "./css/"),
                    "~@components": path.resolve(__dirname, "./components/"),
                    "~@utils": path.resolve(__dirname, "./utils/"),
                },
            },
            ssr: {
                noExternal: Object.keys(pkg.dependencies || {}),
            },
        },
    },
};
