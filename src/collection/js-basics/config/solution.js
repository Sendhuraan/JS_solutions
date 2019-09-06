(function() {

	var solution = {
		node: {
			lint: {
				pattern: ['**/*.js'],
				options: 'defaultLintOptions'
			},
			test: {
				runner: 'mocha',
				pattern: ['**/*_docs.js']
			},
			bundle: false
		},
		browser: {
			lint: {
				pattern: ['**/*.js'],
				options: 'transpileLintOptions'
			},
			test: {
				runner: 'jest',
				pattern: ['**/*_test.js']
			},
			bundle: false,
			template: false
		},
		dirs: {
			node: false,
			browser: false,
			output: false,
			development: false,
			deploy: false
		}
	};

	var publicAPI = {
		solution
	};

	module.exports = publicAPI;
	
})();
