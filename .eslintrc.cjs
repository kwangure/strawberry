module.exports = {
    extends: [
        "@kwangure/eslint-config-svelte",
    ],
    plugins: ["import", "svelte3"],
    settings: {
        "import/resolver": {
            alias: {
                map: [
                    ["~@components", "./components/"],
                    ["~@css", "./css/"],
                    // escape `$` to work around eslint's Regex matching
                    ["\\$app", "./.svelte/dev/runtime/app/"],
                    ["\\$lib", "src/lib/"],
                ],
                extensions: [".js", ".svelte", ".json"],
            },
        },
    },
    overrides: [
        {
            files: ["*.svelte"],
            processor: "svelte3/svelte3",
        },
    ],
};
