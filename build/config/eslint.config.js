'use strict';

(function() {
	
	var ERROR = 'error';
	var rules = {
		// 'Possible Errors' (according to ESLint docs)
		'no-compare-neg-zero': ERROR,
		'no-cond-assign': ERROR,
		'no-constant-condition': ERROR,
		'no-control-regex': ERROR,
		'no-dupe-args': ERROR,
		'no-dupe-keys': ERROR,
		'no-duplicate-case': ERROR,
		'no-empty-character-class': ERROR,
		'no-ex-assign': ERROR,
		'no-extra-boolean-cast': ERROR,
		'no-extra-semi': ERROR,
		'no-func-assign': ERROR,
		'no-inner-declarations': ERROR,
		'no-invalid-regexp': ERROR,
		'no-irregular-whitespace': ERROR,
		'no-obj-calls': ERROR,
		'no-sparse-arrays': ERROR,
		'no-template-curly-in-string': ERROR,
		'no-unexpected-multiline': ERROR,
		'no-unsafe-finally': ERROR,
		'no-unsafe-negation': ERROR,
		'use-isnan': ERROR,
		'valid-typeof': ERROR,

		// 'Best Practices'
		'eqeqeq': ERROR,
		'no-caller': ERROR,
		'no-case-declarations': ERROR,
		'no-empty-pattern': ERROR,
		'no-eq-null': ERROR,
		'no-eval': ERROR,
		'no-extend-native': ERROR,
		'no-fallthrough': ERROR,
		'no-global-assign': ERROR,
		'no-implicit-globals': ERROR,
		'no-implied-eval': ERROR,
		// 'no-invalid-this': ERROR,
		'no-iterator': ERROR,
		'no-loop-func': ERROR,
		'no-octal': ERROR,
		'no-octal-escape': ERROR,
		'no-proto': ERROR,
		'no-redeclare': ERROR,
		'no-restricted-properties': ERROR,
		'no-return-assign': ERROR,
		'no-return-await': ERROR,
		'no-script-url': ERROR,
		'no-self-assign': ERROR,
		'no-self-compare': ERROR,
		'no-throw-literal': ERROR,
		'no-useless-escape': ERROR,
		'no-with': ERROR,
		'prefer-promise-reject-errors': ERROR,
		'radix': ERROR,
		'require-await': ERROR,

		// 'Strict Mode'
		'strict': [ ERROR, 'global' ],

		// 'Variables'
		'no-delete-var': ERROR,
		'no-undef': ERROR,
		'no-undef-init': ERROR,
		'no-use-before-define': [ ERROR, { 'functions': false, 'classes': false, 'variables': false} ],

		// 'Stylistic Issues'
		'new-cap': ERROR,
		'no-bitwise': ERROR,
		'no-mixed-spaces-and-tabs': ERROR,
		'semi': [ ERROR, 'always' ],
		'quotes': [ERROR, 'single'],
		'comma-dangle': [ERROR, 'never'],

		// 'ECMAScript 6'
		'constructor-super': ERROR,
		'no-class-assign': ERROR,
		'no-confusing-arrow': ERROR,
		'no-const-assign': ERROR,
		'no-dupe-class-members': ERROR,
		'no-duplicate-imports': ERROR,
		'no-new-symbol': ERROR,
		'no-this-before-super': ERROR,
		'require-yield': ERROR
	};

	var envs = [
		'browser',
		'node',
		'commonjs',
		'mocha'
	];
	
	// TODO Optimize duplicate options.
	var es5Options = {
		'parserOptions': {
			'ecmaVersion': 2017
		},
		'envs': envs,
		'globals': [
			'Promise'
		],
		'rules': rules
	};


	var es6Options = {
		'parser': 'babel-eslint',
		'envs': envs,
		'globals': [
			'Promise'
		],
		'rules': rules
	};

	module.exports = {
		es5Options: es5Options,
		es6Options: es6Options
	};
	
})();
