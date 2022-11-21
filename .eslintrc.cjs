module.exports = {
	root: true,
	extends: [
		'@kwangure/eslint-config-svelte',
	],
	plugins: ['import', 'svelte3'],
	settings: {
		'import/resolver': {
			alias: {
				map: [
					// escape `$` to work around eslint's Regex matching
					['\\$app', './.svelte-kit/runtime/app/'],
					['\\$lib', './src/lib/'],
					['\\@kwangure/strawberry', './src/lib/'],
				],
				extensions: ['.js', '.svelte', '.json'],
			},
			node: {
				extensions: ['.js'],
				moduleDirectory: ['node_modules', './'],
			},
		},
	},
	overrides: [
		{
			files: ['*.svelte'],
			processor: 'svelte3/svelte3',
		},
	],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
	},
	env: {
		browser: true,
		es2017: true,
		node: true,
	},
};
