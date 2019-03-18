'use strict';

(function() {

	const DEFAULT_FOLDER_STRING = 'src/collection';
	const DEFAULT_DEPLOY_DIR__NODE = 'deploy';
	const DEFAULT_DEPLOY_DIR__BROWSER = 'client';
	const DEFAULT_LINT__GLOBAL = [
		'**/*.js',
		'!node_modules/**',
		'!src/collection/**'
	];
	const DEFAULT_PAGE_CONFIG = {

		node: {
			dir: '',
			test: {
				pattern: false
			},
			bundle: {
				entry: '',
				dir: '',
				file: ''
			},
			server: {
				render: false,
				serveDir: '',
				development: {
					host: '',
					port: 0
				},
				stage: {
					host: '',
					port: 0
				},
				production: {
					host: '',
					port: 0
				}
			},
			db: {
				protocol: '',
				development: {
					host: '',
					port: 0,
					dbName: ''
				},
				stage: {
					host: '',
					port: 0,
					dbName: ''
				},
				production: {
					host: '',
					port: 0,
					dbName: ''
				}
			}

		},
		browser: {
			dir: '',
			test: {
				pattern: false
			},
			bundle: {
				entry: '',
				dir: '',
				file: ''
			},
			template: {
				dir: '',
				page: {
					dir: '',
					file: '',
					data: ''
				}
				
			}
		}
	};

	var defaults = {

		DEFAULT_PAGE_CONFIG,
		DEFAULT_FOLDER_STRING,
		DEFAULT_DEPLOY_DIR__NODE,
		DEFAULT_DEPLOY_DIR__BROWSER,

		DEFAULT_LINT__GLOBAL,

		DEFAULT_NODE_SERVER_DIR: 'server',

		DEFAULT_NODE_SERVER_RENDER: false,

		DEFAULT_NODE_SERVER_DEVELOPMENT_PORT: 3000,
		DEFAULT_NODE_SERVER_STAGE_PORT: 8080,
		DEFAULT_NODE_SERVER_PRODUCTION_PORT: 4200,

		DEFAULT_NODE_SERVER_DEVELOPMENT_HOST: 'localhost',
		DEFAULT_NODE_SERVER_STAGE_HOST: '',
		DEFAULT_NODE_SERVER_PRODUCTION_HOST: '',

		DEFAULT_NODE_TEST_PATTERN: ['**/*_test.js'],
		DEFAULT_NODE_BUNDLE_ENTRY: 'index.js',
		DEFAULT_NODE_BUNDLE_OUTPUT_DIR: DEFAULT_DEPLOY_DIR__NODE,
		DEFAULT_NODE_BUNDLE_OUTPUT_FILE: 'index.js',

		DEFAULT_BROWSER_DIR: 'client',
		DEFAULT_BROWSER_TEST_PATTERN: ['**/*_test.js'],
		DEFAULT_BROWSER_BUNDLE_ENTRY: 'index.js',
		DEFAULT_BROWSER_BUNDLE_OUTPUT_DIR: DEFAULT_DEPLOY_DIR__BROWSER,
		DEFAULT_BROWSER_BUNDLE_OUTPUT_FILE: 'bundle.js',

		DEFAULT_BROWSER_TEMPLATE_DIR: 'templates',
		DEFAULT_BROWSER_TEMPLATE_PAGE_DIR: 'pages',
		DEFAULT_BROWSER_TEMPLATE_PAGE_FILE: 'index.js',
		DEFAULT_BROWSER_TEMPLATE_PAGE_DATA: 'index.data.json'

	};

	var publicAPI = {
		defaults
	};

	module.exports = publicAPI;
	
})();
