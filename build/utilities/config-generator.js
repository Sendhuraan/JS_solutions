'use strict';

(function() {

	var fs = require('fs');
	var path = require('path');
	var karmaConfigParser = require('karma').config;
	var glob = require('glob');
	var HtmlWebpackPlugin = require('html-webpack-plugin');
	var deepMerge = require('deepmerge');

	function SolutionConfig(DEFAULTS, solutionDir, commonConfigs, solutionConfig, solutionDeps, envType) {

		var {
			DEFAULT_FOLDER_STRING,
			DEFAULT_LINT__GLOBAL

		} = DEFAULTS;

		var {
			lintConfig,
			nodeTestConfig,
			browserTestConfig,
			transpileConfig,
			bundleConfig

		} = commonConfigs;

		console.log(solutionDeps);

		var isNode = solutionConfig.node;
		var isBrowser = solutionConfig.browser;

		var isNodeTest = solutionConfig.node.test;
		var isBrowserTest = solutionConfig.browser.test;

		var isNodeBundle = solutionConfig.node.bundle;
		var isBrowserBundle = solutionConfig.browser.bundle;

		var isNodeServer = solutionConfig.node.server;
		var isNodeDB = solutionConfig.node.db;

		var SOURCE_DIR = `${DEFAULT_FOLDER_STRING}/${solutionDir}`;

		var NODE_DIR__PARAM = solutionConfig.node.dir;
		var NODE_DIR = (function(param, inputDir) {
			if(param) {
				return `${inputDir}/${param}`;
			}
			else {
				return `${inputDir}`;
			}
		})(NODE_DIR__PARAM, SOURCE_DIR);


		var BROWSER_DIR__PARAM = solutionConfig.browser.dir;
		var BROWSER_DIR = (function(param, inputDir) {
			if(param) {
				return `${inputDir}/${param}`;
			}
			else {
				return `${inputDir}`;
			}
		})(BROWSER_DIR__PARAM, SOURCE_DIR);

		switch(envType) {
			case 'development':
				var ENV_DEVELOPMENT = true;
				break;
			case 'stage':
				var ENV_STAGE = true;
				break;
			case 'production':
				var ENV_PRODUCTION = true;
				break;
			default:
				ENV_DEVELOPMENT = true;
		}

		var OUTPUT_DIR__PARAM = solutionConfig.node.outputDir;
		var OUTPUT_DIR = (function(param, inputDir) {
			if(param) {
				return `${inputDir}/${param}`;
			}
			else {
				return `${inputDir}`;
			}
		})(OUTPUT_DIR__PARAM, SOURCE_DIR);
		
		if(isNodeServer) {

			var NODE_SERVER_DEVELOPMENT_PORT = solutionConfig.node.server.development.port;
			var NODE_SERVER_STAGE_PORT = solutionConfig.node.server.stage.port;
			var NODE_SERVER_PRODUCTION_PORT = solutionConfig.node.server.production.port;
			var NODE_SERVER_RENDER = solutionConfig.node.server.render;
		}

		if(isNodeTest) {
			var NODE_TEST_PATTERN__PARAM = solutionConfig.node.test.pattern;

			var NODE_TEST_PATTERN = (function(param, inputDir) {
				return param.map(function(item) {
					return `${inputDir}/${item}`;
				});
			})(NODE_TEST_PATTERN__PARAM, NODE_DIR);

		}

		if(isBrowserTest) {
			var BROWSER_TEST_PATTERN__PARAM = solutionConfig.browser.test.pattern;

			var BROWSER_TEST_PATTERN = (function(param, inputDir) {
				return param.map(function(item) {
					return `${inputDir}/${item}`;
				});
			})(BROWSER_TEST_PATTERN__PARAM, BROWSER_DIR);

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

				var browserTestOptions = karmaConfigParser.parseConfig(path.resolve(config.path), override);

				return browserTestOptions;

			})(BROWSER_TEST_PATTERN, browserTestConfig, preprocessConfig);
		}

		if(isNodeBundle) {
			var NODE_BUNDLE_ENTRY__PARAM 		= solutionConfig.node.bundle.entry;
			var NODE_BUNDLE_OUTPUT_DIR__PARAM 	= solutionConfig.node.bundle.output.dir;
			var NODE_BUNDLE_OUTPUT_FILE__PARAM 	= solutionConfig.node.bundle.output.file;

			var NODE_BUNDLE_ENTRY = (function(param, inputDir) {
				return `${inputDir}/${param}`;
			})(NODE_BUNDLE_ENTRY__PARAM, SOURCE_DIR);

			var NODE_BUNDLE_OUTPUT_DIR = OUTPUT_DIR;

			var NODE_BUNDLE_OUTPUT_FILE = NODE_BUNDLE_OUTPUT_FILE__PARAM;

			var NODE_MAIN_FILE = (function(param, inputDir) {
				return `${inputDir}/${param}`;
			})(NODE_BUNDLE_OUTPUT_FILE, OUTPUT_DIR);


			var nodeBundleConfig = (function(config, entry, outputDir, outputFile) {

				var newConfig = Object.assign({}, config);

				newConfig.entry = path.resolve(entry);
				newConfig.output.path = path.resolve(outputDir);
				newConfig.output.filename = outputFile;

				if(ENV_PRODUCTION) {
					newConfig.mode = 'production';
				}

				return newConfig;

			})(bundleConfig.node, NODE_BUNDLE_ENTRY, NODE_BUNDLE_OUTPUT_DIR, NODE_BUNDLE_OUTPUT_FILE);

		}

		if(isBrowserBundle) {
			var BROWSER_BUNDLE_ENTRY__PARAM 	 = solutionConfig.browser.bundle.entry;
			var BROWSER_BUNDLE_OUTPUT_DIR__PARAM = solutionConfig.browser.bundle.output.dir;
			var BROWSER_BUNDLE_OUTPUT_FILE__PARAM= solutionConfig.browser.bundle.output.file;

			var BROWSER_BUNDLE_ENTRY = (function(param, inputDir) {
				return `${inputDir}/${param}`;
			})(BROWSER_BUNDLE_ENTRY__PARAM, BROWSER_DIR);

			var BROWSER_BUNDLE_OUTPUT_DIR = (function(param, inputDir) {
				return `${inputDir}/${param}`;
			})(BROWSER_BUNDLE_OUTPUT_DIR__PARAM, OUTPUT_DIR);

			var BROWSER_BUNDLE_OUTPUT_FILE = BROWSER_BUNDLE_OUTPUT_FILE__PARAM;

			var BROWSER_TEMPLATE_DIR__PARAM 	 = solutionConfig.browser.template.dir;
			var BROWSER_TEMPLATE_PAGE_DIR__PARAM = solutionConfig.browser.template.page.dir;
			var BROWSER_TEMPLATE_PAGE_FILE__PARAM= solutionConfig.browser.template.page.file;
			var BROWSER_TEMPLATE_PAGE_DATA__PARAM= solutionConfig.browser.template.page.data;


			if(!NODE_SERVER_RENDER) {

				var BROWSER_TEMPLATE_DIR = (function(param, inputDir) {
					return `${inputDir}/${param}`;
				})(BROWSER_TEMPLATE_DIR__PARAM, BROWSER_DIR);

				var BROWSER_TEMPLATE_PAGE_DIR = (function(param, inputDir) {
					return `${inputDir}/${param}`;
				})(BROWSER_TEMPLATE_PAGE_DIR__PARAM, BROWSER_TEMPLATE_DIR);

				var BROWSER_TEMPLATE_PAGES = (function(inputDir) {
					return glob.sync(`${inputDir}/*`);
				})(BROWSER_TEMPLATE_PAGE_DIR);

				var BROWSER_TEMPLATE_PAGE_FILE = BROWSER_TEMPLATE_PAGE_FILE__PARAM;
				var BROWSER_TEMPLATE_PAGE_DATA = BROWSER_TEMPLATE_PAGE_DATA__PARAM;

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
				newConfig.output.filename = outputFile;

				if(ENV_PRODUCTION) {
					newConfig.mode = 'production';
				}

				if(!NODE_SERVER_RENDER) {
					templateConfigs.map(function(config) {
						newConfig.plugins.push(config);
					});
				}
				
				return newConfig;

			})(bundleConfig.browser, BROWSER_BUNDLE_ENTRY, BROWSER_BUNDLE_OUTPUT_DIR, BROWSER_BUNDLE_OUTPUT_FILE, browserTemplateConfig);

		}

		if(isNodeServer) {
			var NODE_SERVER_SERVEDIR = BROWSER_BUNDLE_OUTPUT_DIR__PARAM;
		}

		this.config = {

			lint: {
				global: {
					pattern: DEFAULT_LINT__GLOBAL,
					options: lintConfig.es5Options
				},
				source: {
					pattern: OUTPUT_DIR__PARAM ?
					[
						`${SOURCE_DIR}/**/*.js`,
						`${SOURCE_DIR}/**/*.jsx`,
						`!${OUTPUT_DIR}/**/*.js`
					]
					:
					[
						`${SOURCE_DIR}/**/*.js`,
						`${SOURCE_DIR}/**/*.jsx`
					],
					options: lintConfig.es6Options
				}
			},
			node: isNode ? {
				test: isNodeTest ? {
					pattern: NODE_TEST_PATTERN ? NODE_TEST_PATTERN : false,
					options: NODE_TEST_PATTERN ? nodeTestConfig : false
				} : false,
				bundle: nodeBundleConfig ? nodeBundleConfig : false
			} : false,
			browser: isBrowser ? {
				test: isBrowserTest ? {
					pattern: BROWSER_TEST_PATTERN ? BROWSER_TEST_PATTERN : false,
					options: BROWSER_TEST_OPTIONS ? BROWSER_TEST_OPTIONS : false
				} : false,
				bundle: browserBundleConfig ? browserBundleConfig : false
			} : false,
			build: isNodeServer ? {
				dirs: {
					source: SOURCE_DIR ? SOURCE_DIR : false,
					node: NODE_DIR ? NODE_DIR : false,
					browser: BROWSER_DIR ? BROWSER_DIR : false,
					output: NODE_BUNDLE_OUTPUT_DIR ? NODE_BUNDLE_OUTPUT_DIR : OUTPUT_DIR,
					serve: BROWSER_BUNDLE_OUTPUT_DIR ? BROWSER_BUNDLE_OUTPUT_DIR : false
				},
				envs: {
					development: ENV_DEVELOPMENT ? {
						server: isNodeServer ? {
							host: 'localhost',
							port: NODE_SERVER_DEVELOPMENT_PORT ? NODE_SERVER_DEVELOPMENT_PORT : false,
							serveDir: NODE_SERVER_SERVEDIR ? NODE_SERVER_SERVEDIR : false
						} : false,
						db: isNodeDB ? {
							host: 'localhost',
							connectionString: ''
						} : false
					} : false,
					stage: ENV_STAGE ? {
						server: isNodeServer ? {
							host: '',
							port: NODE_SERVER_DEVELOPMENT_PORT ? NODE_SERVER_DEVELOPMENT_PORT : false,
							serveDir: NODE_SERVER_SERVEDIR ? NODE_SERVER_SERVEDIR : false
						} : false,
						db: isNodeDB ? {
							host: '',
							connectionString: ''
						} : false
					} : false,
					production: ENV_PRODUCTION ? {
						port: NODE_SERVER_PRODUCTION_PORT ? NODE_SERVER_PRODUCTION_PORT : false,
						serveDir: NODE_SERVER_SERVEDIR ? NODE_SERVER_SERVEDIR : false
					} : false
				}
			} : false,
			run: {
				dir: NODE_MAIN_FILE ? NODE_MAIN_FILE : OUTPUT_DIR
			}
		};
		
	}

	var publicAPI = {
		SolutionConfig
	};

	module.exports = publicAPI;
	
})();
