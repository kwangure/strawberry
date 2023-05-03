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
};
