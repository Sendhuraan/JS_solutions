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
					host: 'localhost',
					port: 3000
				},
				stage: {
					// set stage host
					host: '',
					// set stage port
					port: 0
				},
				production: {
					// set production host
					host: '',
					// set production host
					port: 0
				}
			},
			db: {
				protocol: 'mongodb://',
				development: {
					host: 'localhost',
					port: 27017,
					// set DB name
					dbName: ''
				},
				stage: {
					// set stage DB host
					host: '',
					// set stage DB port
					port: 0,
					// set stage DB name
					dbName: ''
				},
				production: {
					// set production DB host
					host: '',
					// set production DB port
					port: 0,
					// set production DB name
					dbName: ''
				}
			},
			deploy: 'deploy'
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
		}
	};

	var publicAPI = {
		config,
		npmDependencies
	};

	module.exports = publicAPI;
	
})();
