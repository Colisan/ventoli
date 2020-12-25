module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: [
		'plugin:@typescript-eslint/recommended',
		'prettier/@typescript-eslint',
		'plugin:prettier/recommended',
	],
	plugins: ['@typescript-eslint'],
	parserOptions: {
		parser: '@typescript-eslint/parser',
	},
};
