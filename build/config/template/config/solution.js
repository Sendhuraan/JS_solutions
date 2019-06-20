'use strict';

(function() {

	var solution = {
		node: {
			// dir: '<sourceDir>' to set source dir.
			dir: 'server',
			test: {
				runner: 'mocha',
				pattern: ['**/*_test.js', 'server/**/*.js']
			},
			bundle: {
				entry: 'index.js',
				output: {
					file: 'index.js'
				}
			}
		},
		browser: {
			// dir: '<sourceDir>' to set source dir.
			dir: 'client',
			test: {
				runner: 'karma',
				pattern: ['**/*_test.jsx']
			},
			bundle: {
				entry: 'index.jsx',
				output: {
					dir: 'dist',
					file: 'bundle.js'
				}
			},
			template: {
				dir: 'templates',
				page: {
					dir: 'pages',
					file: 'index.js',
					data: 'index.data.json'
				}
			}
		},
		dirs: {
			outputDir: 'output',
			developmentDir: 'workstation',
			deployDir: 'deploy'
		}
	};

	var publicAPI = {
		solution
	};

	module.exports = publicAPI;
	
})();
