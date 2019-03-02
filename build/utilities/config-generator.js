'use strict';

(function() {

	var fs = require('fs');
	var path = require('path');
	var karmaConfigParser = require('karma').config;
	var glob = require('glob');
	var HtmlWebpackPlugin = require('html-webpack-plugin');

	function DefaultConfig(DEFAULTS, pageDir, commonConfigs, pageConfig) {

		var {

			DEFAULT_FOLDER_STRING,
			DEFAULT_DEPLOY_DIR__NODE,
			DEFAULT_DEPLOY_DIR__BROWSER,

			DEFAULT_LINT__GLOBAL,

			DEFAULT_NODE_DIR,

			DEFAULT_NODE_TEST_PATTERN,

			DEFAULT_NODE_BUNDLE_ENTRY,
			DEFAULT_NODE_BUNDLE_OUTPUT_FILE,

			DEFAULT_NODE_SERVER_PORT,
			DEFAULT_NODE_SERVER_RENDER,


			DEFAULT_BROWSER_DIR,

			DEFAULT_BROWSER_TEST_PATTERN,

			DEFAULT_BROWSER_BUNDLE_ENTRY,
			DEFAULT_BROWSER_BUNDLE_OUTPUT_FILE,

			DEFAULT_BROWSER_TEMPLATE_DIR,
			DEFAULT_BROWSER_TEMPLATE_PAGE_DIR,
			DEFAULT_BROWSER_TEMPLATE_PAGE_FILE,
			DEFAULT_BROWSER_TEMPLATE_PAGE_DATA

		} = DEFAULTS;

		var {
			lintConfig,
			nodeTestConfig,
			browserTestConfig,
			transpileConfig,
			bundleConfig

		} = commonConfigs;

		var isNodeServer 						= pageConfig.node.server;
		var isNodeTest 							= pageConfig.node.test;
		var isBrowser 							= pageConfig.browser;
		var isBrowserTest 						= pageConfig.browser.test;
		var isNodeBundle 						= pageConfig.node.bundle;
		var isBrowserBundle 					= pageConfig.browser.bundle;

		var NODE_DIR__OVERRIDE 					= pageConfig.node.dir;
		var NODE_SERVER_PORT__OVERRIDE 			= pageConfig.node.server.port;
		var NODE_SERVER_RENDER__OVERRIDE 		= pageConfig.node.server.render;
		var NODE_TEST_PATTERN__OVERRIDE 		= pageConfig.node.test.pattern;
		var NODE_BUNDLE_ENTRY__OVERRIDE 		= pageConfig.node.bundle.entry;
		var NODE_BUNDLE_OUTPUT_FILE__OVERRIDE 	= pageConfig.node.bundle.output;

		var BROWSER_DIR__OVERRIDE 				= pageConfig.browser.dir;
		var BROWSER_TEST_PATTERN__OVERRIDE 		= pageConfig.browser.test.pattern;
		var BROWSER_BUNDLE_ENTRY__OVERRIDE 		= pageConfig.browser.bundle.entry;
		var BROWSER_BUNDLE_OUTPUT_FILE__OVERRIDE= pageConfig.browser.bundle.output;

		var BROWSER_TEMPLATE_DIR__OVERRIDE 		= pageConfig.browser.template.dir;
		var BROWSER_TEMPLATE_PAGE_DIR__OVERRIDE = pageConfig.browser.template.page.dir;
		var BROWSER_TEMPLATE_PAGE_FILE__OVERRIDE= pageConfig.browser.template.page.file;
		var BROWSER_TEMPLATE_PAGE_DATA__OVERRIDE= pageConfig.browser.template.page.data;

		var SOURCE_DIR = `${DEFAULT_FOLDER_STRING}/${pageDir}`;
		var NODE_DIR = (function(overrideParam, defaultParam, inputDir) {
			if(overrideParam) {
				return `${inputDir}/${overrideParam}`;
			}
			else {
				return `${inputDir}/${defaultParam}`
			}
		})(NODE_DIR__OVERRIDE, DEFAULT_NODE_DIR, SOURCE_DIR);

		var BROWSER_DIR = `${SOURCE_DIR}/${DEFAULT_BROWSER_DIR}`;
		var DEPLOY_DIR = `${SOURCE_DIR}/${DEFAULT_DEPLOY_DIR__NODE}`;
		var DEPLOY_BROWSER_DIR = `${DEPLOY_DIR}/${DEFAULT_DEPLOY_DIR__BROWSER}`;
		var NODE_SERVER_SERVEDIR = DEPLOY_BROWSER_DIR;

		if(isNodeServer || isBrowser) {

			var NODE_SERVER_PORT = NODE_SERVER_PORT__OVERRIDE || DEFAULT_NODE_SERVER_PORT;
			var NODE_SERVER_RENDER = NODE_SERVER_RENDER__OVERRIDE || DEFAULT_NODE_SERVER_RENDER;

			console.log(NODE_SERVER_PORT);
			console.log(NODE_SERVER_SERVEDIR);
			console.log(NODE_SERVER_RENDER);

		}

		if(isNodeTest) {
			var NODE_TEST_PATTERN = (function(overrideParam, defaultParam, inputDir) {
				if(overrideParam) {
					return overrideParam.map(function(item) {
						return `${inputDir}/${item}`
					});
				}
				else {
					return defaultParam.map(function(item) {
						return `${inputDir}/${item}`
					});
				}
			})(NODE_TEST_PATTERN__OVERRIDE, DEFAULT_NODE_TEST_PATTERN, NODE_DIR);
		}

		if(isBrowserTest) {
			var BROWSER_TEST_PATTERN = (function(overrideParam, defaultParam, inputDir) {
				if(overrideParam) {
					return overrideParam.map(function(item) {
						return `${inputDir}/${item}`;
					});
				}
				else {
					return defaultParam.map(function(item) {
						return `${inputDir}/${item}`;
					});
				}
			})(BROWSER_TEST_PATTERN__OVERRIDE, DEFAULT_BROWSER_TEST_PATTERN, BROWSER_DIR);

			var preprocessConfig = bundleConfig.browser.module;

			var BROWSER_TEST_OPTIONS = (function(pattern, config, preprocessor) {

				var override = {
					files: pattern,
					preprocessors: {},
					webpack: {
						module: preprocessor
					}
				};

				pattern.map(function(item) {
					override.preprocessors[item] = ['webpack'];
				});

				var browserTestOptions = karmaConfigParser.parseConfig(path.resolve(config.path), override)

				return browserTestOptions;

			})(BROWSER_TEST_PATTERN, browserTestConfig, preprocessConfig);
		}

		if(isNodeBundle) {

			var NODE_BUNDLE_ENTRY = (function(overrideParam, defaultParam, inputDir) {
				if(overrideParam) {
					return `${inputDir}/${overrideParam}`;
				}
				else {
					return `${inputDir}/${defaultParam}`;
				}
			})(NODE_BUNDLE_ENTRY__OVERRIDE, DEFAULT_NODE_BUNDLE_ENTRY, SOURCE_DIR);

			var NODE_BUNDLE_OUTPUT_DIR = DEPLOY_DIR;

			var NODE_BUNDLE_OUTPUT_FILE = (function(overrideParam, defaultParam, inputDir) {
				if(overrideParam) {
					return `${inputDir}/${overrideParam}`;
				}
				else {
					return `${inputDir}/${defaultParam}`;
				}
			})(NODE_BUNDLE_OUTPUT_FILE__OVERRIDE, DEFAULT_NODE_BUNDLE_OUTPUT_FILE, DEPLOY_DIR);

			var nodeBundleConfig = (function(config, entry, outputDir, outputFile) {

				var newConfig = Object.assign({}, config);

				newConfig.entry = path.resolve(entry);
				newConfig.output.path = path.resolve(DEPLOY_DIR);
				newConfig.output.filename = path.resolve(DEPLOY_DIR);

				return newConfig;

			})(bundleConfig.node, NODE_BUNDLE_ENTRY, NODE_BUNDLE_OUTPUT_DIR, NODE_BUNDLE_OUTPUT_FILE);

		}

		if(isBrowserBundle) {

			var BROWSER_BUNDLE_ENTRY = (function(overrideParam, defaultParam, inputDir) {
				if(overrideParam) {
					return `${inputDir}/${overrideParam}`;
				}
				else {
					return `${inputDir}/${defaultParam}`;
				}
			})(BROWSER_BUNDLE_ENTRY__OVERRIDE, DEFAULT_BROWSER_BUNDLE_ENTRY, SOURCE_DIR);

			var BROWSER_BUNDLE_OUTPUT_DIR = DEPLOY_BROWSER_DIR;

			var BROWSER_BUNDLE_OUTPUT_FILE = (function(overrideParam, defaultParam, inputDir) {
				if(overrideParam) {
					return `${inputDir}/${overrideParam}`;
				}
				else {
					return `${inputDir}/${defaultParam}`;
				}
			})(BROWSER_BUNDLE_OUTPUT_FILE__OVERRIDE, DEFAULT_BROWSER_BUNDLE_OUTPUT_FILE, DEPLOY_BROWSER_DIR);

			if(!NODE_SERVER_RENDER) {

				var BROWSER_TEMPLATE_DIR = (function(overrideParam, defaultParam, inputDir) {
					if(overrideParam) {
						return `${inputDir}/${overrideParam}`;
					}
					else {
						return `${inputDir}/${defaultParam}`;
					}
				})(BROWSER_TEMPLATE_DIR__OVERRIDE, DEFAULT_BROWSER_TEMPLATE_DIR, BROWSER_DIR);

				var BROWSER_TEMPLATE_PAGE_DIR = (function(overrideParam, defaultParam, inputDir) {
					if(overrideParam) {
						return `${inputDir}/${overrideParam}`;
					}
					else {
						return `${inputDir}/${defaultParam}`;
					}
				})(BROWSER_TEMPLATE_PAGE_DIR__OVERRIDE, DEFAULT_BROWSER_TEMPLATE_PAGE_DIR, BROWSER_TEMPLATE_DIR);

				var BROWSER_TEMPLATE_PAGES = (function(pageDir) {
					return glob.sync(`${pageDir}/*`);
				})(BROWSER_TEMPLATE_PAGE_DIR);

				var BROWSER_TEMPLATE_PAGE_FILE = (function(overrideParam, defaultParam) {
					if(overrideParam) {
						return `${overrideParam}`;
					}
					else {
						return `${defaultParam}`;
					}
				})(BROWSER_TEMPLATE_PAGE_FILE__OVERRIDE, DEFAULT_BROWSER_TEMPLATE_PAGE_FILE);

				var BROWSER_TEMPLATE_PAGE_DATA = (function(overrideParam, defaultParam) {
					if(overrideParam) {
						return `${overrideParam}`;
					}
					else {
						return `${defaultParam}`;
					}
				})(BROWSER_TEMPLATE_PAGE_DATA__OVERRIDE, DEFAULT_BROWSER_TEMPLATE_PAGE_DATA);

				var browserTemplateConfig = (function(pages, filename, dataname) {

					var htmlConfigs = pages.map(function(page) {

						var pageTemplate = `${page}/${filename}`;

						var pageData = fs.readFileSync(`${page}/${dataname}`);
						var parsedData = JSON.parse(pageData);

						return new HtmlWebpackPlugin({
							template: pageTemplate,
							templateParameters: parsedData.templateParams,
							filename: parsedData.metadata.outputFileName
						});
					});

					return htmlConfigs;

				})(BROWSER_TEMPLATE_PAGES, BROWSER_TEMPLATE_PAGE_FILE, BROWSER_TEMPLATE_PAGE_DATA);

			}
			

			var browserBundleConfig = (function(config, entry, outputDir, outputFile, templateConfigs) {

				var newConfig = Object.assign({}, config);

				newConfig.entry = path.resolve(entry);
				newConfig.output.path = path.resolve(outputDir);
				newConfig.output.filename = path.resolve(outputFile);

				if(!NODE_SERVER_RENDER) {
					templateConfigs.map(function(config) {
						newConfig.plugins.push(config);
					});
				}
				
				return newConfig;

			})(bundleConfig.browser, BROWSER_BUNDLE_ENTRY, BROWSER_BUNDLE_OUTPUT_DIR, BROWSER_BUNDLE_OUTPUT_FILE, browserTemplateConfig);

			console.log(JSON.stringify(browserBundleConfig, null, 4));

		}

		this.defaultPaths = {
			SOURCE_DIR,
			NODE_DIR,
			NODE_TEST_PATTERN,
			NODE_BUNDLE_ENTRY,
			NODE_BUNDLE_OUTPUT_FILE,

			BROWSER_DIR,
			BROWSER_TEST_PATTERN,
			BROWSER_BUNDLE_ENTRY,
			BROWSER_BUNDLE_OUTPUT_FILE,

			BROWSER_TEMPLATE_DIR,
			BROWSER_TEMPLATE_PAGE_DIR,
			BROWSER_TEMPLATE_PAGES,
			BROWSER_TEMPLATE_PAGE_FILE,
			BROWSER_TEMPLATE_PAGE_DATA,

			DEPLOY_DIR,
			DEPLOY_BROWSER_DIR,
			NODE_SERVER_SERVEDIR
		}

		this.config = {

			lint: {
				global: {
					pattern: DEFAULT_LINT__GLOBAL,
					options: lintConfig.es5Options
				},
				source: {
					pattern: [
						`${SOURCE_DIR}/**/*.js`,
						`${SOURCE_DIR}/**/*.jsx`,
						`!${DEPLOY_DIR}/**/*.js`
					],
					options: lintConfig.es6Options
				}
			},
			node: {
				test: {
					pattern: NODE_TEST_PATTERN ? NODE_TEST_PATTERN : false,
					options: nodeTestConfig
				},
				bundle: nodeBundleConfig ? nodeBundleConfig : false,
				server: {
					port: NODE_SERVER_PORT,
					serveDir: `${NODE_SERVER_SERVEDIR}`
				}
			},
			browser: {
				test: {
					pattern: BROWSER_TEST_PATTERN ? BROWSER_TEST_PATTERN : false,
					options: BROWSER_TEST_OPTIONS ? BROWSER_TEST_OPTIONS : false
				},
				bundle: browserBundleConfig ? browserBundleConfig : false
			}
		};
		
	}

	function FolderNamesGenerator(DEFAULTS, pageDir, commonConfigs, pageConfig) {

		this.config = {};
		var {

			DEFAULT_FOLDER_STRING,
			DEFAULT_DEPLOY_DIR__NODE,
			DEFAULT_DEPLOY_DIR__BROWSER,

			DEFAULT_NODE_DIR,

			DEFAULT_NODE_TEST_PATTERN,

			DEFAULT_NODE_BUNDLE_ENTRY,
			DEFAULT_NODE_BUNDLE_OUTPUT_DIR,
			DEFAULT_NODE_BUNDLE_OUTPUT_FILE,

			DEFAULT_NODE_SERVER_PORT,
			DEFAULT_NODE_SERVER_SERVEDIR,
			DEFAULT_NODE_SERVER_RENDER,


			DEFAULT_BROWSER_DIR,

			DEFAULT_BROWSER_TEST_PATTERN,

			DEFAULT_BROWSER_BUNDLE_ENTRY_DIR,
			DEFAULT_BROWSER_BUNDLE_ENTRY_FILE,
			DEFAULT_BROWSER_BUNDLE_OUTPUT_DIR,
			DEFAULT_BROWSER_BUNDLE_OUTPUT_FILE,

			DEFAULT_BROWSER_TEMPLATE_DIR,
			DEFAULT_BROWSER_TEMPLATE_FILE,
			DEFAULT_BROWSER_TEMPLATE_DATA

		} = DEFAULTS;

		var isNodeServer 					= pageConfig.node.server;

		var isNodeTest 						= pageConfig.node.test;

		var NODE_DIR__OVERRIDE 				= pageConfig.node.dir;
		var NODE_SERVER_PORT__OVERRIDE 		= pageConfig.node.server.port;
		var NODE_SERVER_SERVEDIR__OVERRIDE 	= pageConfig.node.server.serveDir;
		var NODE_SERVER_RENDER__OVERRIDE 	= pageConfig.node.server.render;
		var NODE_TEST_PATTERN__OVERRIDE 	= pageConfig.node.test.pattern;
		var NODE_BUNDLE_ENTRY__OVERRIDE 	= pageConfig.node.bundle.entry;
		var NODE_BUNDLE_OUTPUT__OVERRIDE 	= pageConfig.node.bundle.output;

		var BROWSER_DIR__OVERRIDE 			= pageConfig.browser.dir;
		var BROWSER_TEST_PATTERN__OVERRIDE 	= pageConfig.browser.test.pattern;
		var BROWSER_BUNDLE_ENTRY__OVERRIDE 	= pageConfig.browser.bundle.entry;
		var BROWSER_BUNDLE_OUTPUT__OVERRIDE = pageConfig.browser.bundle.output;
		var BROWSER_TEMPLATE_DIR__OVERRIDE 	= pageConfig.browser.template.dir;
		var BROWSER_TEMPLATE_FILE__OVERRIDE = pageConfig.browser.template.file;
		var BROWSER_TEMPLATE_DATA__OVERRIDE = pageConfig.browser.template.data;

		this.SOURCE_DIR = `${DEFAULT_FOLDER_STRING}/${pageDir}`;
		this.NODE_SERVER_DIR = (function(overrideParam, defaultParam, inputDir) {
			if(overrideParam) {
				return `${inputDir}/${overrideParam}`;
			}
			else {
				return `${inputDir}/${defaultParam}`
			}
		})(NODE_DIR__OVERRIDE, DEFAULT_NODE_DIR, this.SOURCE_DIR);
		
		this.BROWSER_DIR = (function(overrideParam, defaultParam, inputDir) {
			if(overrideParam) {
				return `${inputDir}/${overrideParam}`;
			}
			else {
				return `${inputDir}/${defaultParam}`
			}
		})(BROWSER_DIR__OVERRIDE, DEFAULT_BROWSER_DIR, this.SOURCE_DIR);

		if(isNodeServer) {

			

			this.config.run = {};
			this.config.run.server = {};

			this.config.run.server.port = (function(overrideParam, defaultParam) {
				if(overrideParam) {
					return `${overrideParam}`;
				}
				else {
					return `${defaultParam}`
				}
			})(NODE_SERVER_PORT__OVERRIDE, DEFAULT_NODE_SERVER_PORT);

		}

		if(isNodeTest) {

			this.config.tests = {};
			this.config.tests.node = {};

			this.config.tests.node.pattern = (function(overrideParam, defaultParam) {
				if(overrideParam) {
					return overrideParam;
				}
				else {
					return defaultParam;
				}
			})(NODE_TEST_PATTERN__OVERRIDE, DEFAULT_NODE_TEST_PATTERN);

		}

	}

	function ConfigGenerator(dir, commonConfigs, pageConfigs) {

		var COLLECTION_DIR = 'src/collection/';
		var DIRNAME = program.dir;
		var SOURCE_DIR = COLLECTION_DIR + DIRNAME;
		var SERVER_DIR = SOURCE_DIR + '/server';
		var CLIENT_DIR = SOURCE_DIR + '/client';
		var GENERATED_DIR = SOURCE_DIR + '/generated';
		var BROWSERIFY_DIR = GENERATED_DIR + '/bundle';
		var DEPLOY_DIR = SOURCE_DIR + '/deploy';
		var DEPLOY_SERVER_DIR = DEPLOY_DIR + '/server';
		var DEPLOY_CLIENT_DIR = DEPLOY_DIR + '/client';
		var SERVE_DIR = DEPLOY_DIR + '/client';

		var TEMPLATE_DIR = CLIENT_DIR + '/templates';
		var TEMPLATE_FILENAME = 'index.js';
		var TEMPLATE_DATAFILE = 'index.data.json';

		var config = {

			lint: {
				global: {
					pattern: ['**/*.js', '!node_modules'],
					options: {}
				},
				source: {
					pattern: [],
					options: {}
				}
			},
			node: {
				dir: 'app',
				test: {
					pattern: ['**/*.test.js']
				},
				bundle: {
					entry: 'app.js',
					output: 'server.js'
				},
				server: {
					port: 5666,
					serveDir: 'public',
					render: true
				}
			},
			browser: {
				dir: 'browser',
				test: {
					pattern: ['**/*.test.js', '**/*.test.jsx']
				},
				bundle: {
					entry: 'app.js',
					output: 'main.js'
				},
				template: {
					dir: 'partials',
					file: 'main.js',
					data: 'data.json'
				}
			}
		};

		// var config = {
		// 	lint: {
		// 		global: {
		// 			pattern: ['**/*.js', '!node_modules'],
		// 			options: {}
		// 		},
		// 		source: {
		// 			pattern: [],
		// 			options: {}
		// 		}
		// 	},
		// 	tests: {
		// 		node: {
		// 			pattern: [],
		// 			options: {}
		// 		},
		// 		browser: {
		// 			pattern: [],
		// 			options: {}
		// 		}
		// 	},
		// 	build: {
		// 		node: {},
		// 		browser: {}
		// 	},
		// 	run: {
		// 		node: {
		// 			// env variables
		// 		},
		// 		// or
		// 		server: {
		// 			port: 3000,
		// 			serveDir: 'client'
		// 		},
		// 		// and/or
		// 		data: {
		// 			mongoURI: 'mongodb://localhost/dbname'
		// 		}
				
		// 	}
		// }
		
	}

	var publicAPI = {
		ConfigGenerator,
		FolderNamesGenerator,
		DefaultConfig
	};

	module.exports = publicAPI;
	
})();
