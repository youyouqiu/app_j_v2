module.exports = {
	root: true,
	plugins: [
		"react",
		"react-native",
		// "typescript"
	],
	parserOptions: {
		ecmaVersion: 2017,
		sourceType: 'module',
		ecmaFeatures: {
			experimentalObjectRestSpread: true,
			jsx: true,
			modules: true
		}
	},
	env: {
		node: true,
		es6: true
	},
	parser: "babel-eslint",
	rules: {
		"quotes": [1, "single"],
		"indent": 0,
		"no-undef": 2,
		'no-console': 1,
		'no-debugger': 2,
		"no-unused-vars": ["error", { "args": "all" }],
		"react/jsx-uses-react": 2,
		"react/jsx-uses-vars": 2,
		"react/display-name": 1,
		"react/jsx-no-undef": 2
	},
	globals: {
		"fetch": false,
		"Headers": false,
		"storage": false,
		"store": false,
		"FormData": false
	}
};
