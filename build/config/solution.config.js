'use strict';

(function() {

	var npmDependencies = JSON.parse(require('./dependencies.json')).dependencies;

	var config = {
		node: {
			// remove dir to set source dir.
			dir: 'server',
			test: {
				pattern: ['**/*_test.js']
			},
			bundle: {
				entry: 'index.js',
				output: {
					file: 'index.js'
				}
			},
			server: {
				render: false,
				serveDir: 'client',
				development: {
					port: 3000
				},
				stage: {
					port: 8080
				},
				production: {
					port: 80
				}
			},
			db: {
				protocol: 'mongodb://',
				development: {
					username: '',
					password: '',
					port: 27017,
					dbName: ''
				},
				stage: {
					username: '',
					password: '',
					port: 0,
					dbName: ''
				},
				production: {
					username: '',
					password: '',
					port: 0,
					dbName: ''
				}
			},
			outputDir: 'deploy'
		},
		browser: {
			// remove dir to set source dir.
			dir: 'client',
			test: {
				pattern: ['**/*_test.js']
			},
			bundle: {
				entry: 'index.js',
				output: {
					dir: 'client',
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
		deploy: {
			enabled: false,
			cloudService: 'aws',
			environment: 'stage',
			includeDependencies: false
		}
	};

	var publicAPI = {
		config,
		npmDependencies
	};

	module.exports = publicAPI;
	
})();
