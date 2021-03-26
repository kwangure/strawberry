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
                    ["$app", "./.svelte/dev/runtime/app/"],
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
