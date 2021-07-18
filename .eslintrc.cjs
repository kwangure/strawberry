module.exports = {
    extends: [
        "@kwangure/eslint-config-svelte",
    ],
    plugins: ["import", "svelte3"],
    settings: {
        "import/resolver": {
            alias: {
                map: [
                    ["~@components", "./src/lib/components/"],
                    ["~@css", "./src/lib/css/"],
                    // escape `$` to work around eslint's Regex matching
                    ["\\$app", "./.svelte-kit/dev/runtime/app/"],
                    ["\\$lib", "./src/lib/"],
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
