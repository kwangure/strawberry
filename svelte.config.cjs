const path = require("path");
const pkg = require("./package.json");
const { preprocessConfig } = require("./config/index.cjs");
const static = require("@sveltejs/adapter-static");

const MODE = process.env.NODE_ENV;
const DEV = MODE === "development";
const PROD = MODE === "production";

/** @type {import("@sveltejs/kit").Config} */
module.exports = {
    preprocess: preprocessConfig,
    kit: {
        appDir: "app",
        adapter: static(),
        paths: {
			base: PROD ? "/strawberry" : "",
		},
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
