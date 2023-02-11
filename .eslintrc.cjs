module.exports = {
	root: true,
	extends: [
		'@kwangure/eslint-config-svelte',
	],
	settings: {
		'import/resolver': {
			alias: {
				map: [
					['@kwangure/strawberry', './src/lib/'],
				],
			},
		},
	},
	rules: {
		'import/no-unresolved': ['error', { ignore: [
			':docs$', // used to annotate svelte-doc imports
			// CJS fighting ES6 exports field
			'\\$app/',
			'@sveltejs/kit',
		]}],
		// ESLint CJS fighting Svelte's ES6 exports field
		'import/namespace': ['error'],
		'import/named': 'off',
	},
};
