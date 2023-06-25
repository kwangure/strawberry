module.exports = {
	root: true,
	extends: [
		'@kwangure/eslint-config-svelte',
		'plugin:require-extensions/recommended',
	],
	plugins: ['require-extensions'],
	settings: {
		'import/resolver': {
			alias: {
				map: [['@kwangure/strawberry', './src/lib/']],
			},
		},
	},
};
