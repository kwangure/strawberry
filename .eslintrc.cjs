module.exports = {
    root: true,
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
    parserOptions: {
        sourceType: "module",
        ecmaVersion: 2020
    },
    env: {
        browser: true,
        es2017: true,
        node: true,
    },
};
