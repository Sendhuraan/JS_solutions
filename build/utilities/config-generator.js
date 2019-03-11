'use strict';

(function() {

	var fs = require('fs');
	var path = require('path');
	var karmaConfigParser = require('karma').config;
	var glob = require('glob');
	var HtmlWebpackPlugin = require('html-webpack-plugin');
	var deepMerge = require('deepmerge');

	function SolutionConfig(DEFAULTS, pageDir, commonConfigs, pageConfig) {

		var {

			DEFAULT_PAGE_CONFIG,
			DEFAULT_FOLDER_STRING,
			DEFAULT_DEPLOY_DIR__NODE,
			DEFAULT_DEPLOY_DIR__BROWSER,

			DEFAULT_LINT__GLOBAL,

			DEFAULT_NODE_SERVER_DIR,

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


		var processedConfig = (function(defaultConfig, solutionConfig) {

			var resetConfig = Object.assign({}, defaultConfig, solutionConfig);

			function isEmptyObject(obj) {
				for(var prop in obj) {
					if(obj.hasOwnProperty(prop))
					return false;
				}
				return JSON.stringify(obj) === JSON.stringify({});
			}

			function isOnlyBrowser(obj) {
				return (Object.keys(obj).length === 1 &&
				obj.browser === true);
			}
			function isNodeAndBrowser(obj) {
				return (Object.keys(obj).length > 1 &&
				obj.browser === true);
			}

			if(isEmptyObject(solutionConfig)) {
				let override = {
					node: true,
					browser: false
				};

				let config = Object.assign({}, defaultConfig);

				return deepMerge(config, override);
			}
			else if(isOnlyBrowser(solutionConfig)) {
				let override = {
					node: {
						dir: DEFAULT_NODE_SERVER_DIR,
						test: false,
						bundle: false,
						server: true
					},
					browser: {
						test: false,
						bundle: true
					}
				};

				let config = Object.assign({}, defaultConfig);

				return deepMerge(config, override);
			}
			else {
				let config = Object.assign({}, defaultConfig);

				return deepMerge(config, solutionConfig);
			}
			
		})(DEFAULT_PAGE_CONFIG, pageConfig);

		console.log(JSON.stringify(processedConfig, null, 4));

		
		var isNodeTest 				= processedConfig.node.test;
		var isBrowserTest 			= processedConfig.browser.test;

		var isNodeBundle 			= processedConfig.node.bundle;
		var isBrowserBundle 		= processedConfig.browser.bundle;

		var isNodeServer = (function() {
			if(typeof processedConfig.node.server === 'boolean') {
				return processedConfig.node.server;
			}
			else  {
				return Boolean(
					processedConfig.node.server.port && 
					processedConfig.node.server.render
				);
			}
		})();

		var isNode 					= processedConfig.node;
		var isBrowser 				= processedConfig.browser;

		var NODE_DIR__OVERRIDE 		= processedConfig.node.dir;
		var BROWSER_DIR__OVERRIDE 	= processedConfig.browser.dir;

		console.log(`isNodeTest: ${isNodeTest}`);
		console.log(`isBrowserTest: ${isBrowserTest}`);
		console.log(`isNodeBundle: ${isNodeBundle}`);
		console.log(`isBrowserBundle: ${isBrowserBundle}`);
		console.log(`isNodeServer: ${isNodeServer}`);
		console.log(`isNode: ${isNode}`);
		console.log(`isBrowser: ${isBrowser}`);
		
		var SOURCE_DIR = `${DEFAULT_FOLDER_STRING}/${pageDir}`;

		var NODE_DIR = (function(overrideParam, inputDir) {
			if(overrideParam) {
				return `${inputDir}/${overrideParam}`;
			}
			else {
				return `${inputDir}`;
			}
		})(NODE_DIR__OVERRIDE, SOURCE_DIR);

		console.log(NODE_DIR);

		var BROWSER_DIR = `${SOURCE_DIR}/${DEFAULT_BROWSER_DIR}`;
		var DEPLOY_DIR = `${SOURCE_DIR}/${DEFAULT_DEPLOY_DIR__NODE}`;
		

		if(isNodeServer || isBrowser) {

			var NODE_SERVER_PORT__OVERRIDE 	 = processedConfig.node.server.port;
			var NODE_SERVER_RENDER__OVERRIDE = processedConfig.node.server.render;

			var NODE_SERVER_PORT = NODE_SERVER_PORT__OVERRIDE || DEFAULT_NODE_SERVER_PORT;
			var NODE_SERVER_RENDER = NODE_SERVER_RENDER__OVERRIDE || DEFAULT_NODE_SERVER_RENDER;

			var DEPLOY_BROWSER_DIR = `${DEPLOY_DIR}/${DEFAULT_DEPLOY_DIR__BROWSER}`;
			var NODE_SERVER_SERVEDIR = DEPLOY_BROWSER_DIR;
		}

		if(isNodeTest) {
			var NODE_TEST_PATTERN__OVERRIDE = processedConfig.node.test.pattern;

			var NODE_TEST_PATTERN = (function(overrideParam, defaultParam, inputDir) {
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
			})(NODE_TEST_PATTERN__OVERRIDE, DEFAULT_NODE_TEST_PATTERN, NODE_DIR);

			console.log(NODE_TEST_PATTERN);

		}

		if(isBrowserTest) {
			var BROWSER_TEST_PATTERN__OVERRIDE = processedConfig.browser.test.pattern;

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

				var browserTestOptions = karmaConfigParser.parseConfig(path.resolve(config.path), override);

				return browserTestOptions;

			})(BROWSER_TEST_PATTERN, browserTestConfig, preprocessConfig);
		}

		if(isNodeBundle) {
			var NODE_BUNDLE_ENTRY__OVERRIDE 		= processedConfig.node.bundle.entry;
			var NODE_BUNDLE_OUTPUT_FILE__OVERRIDE 	= processedConfig.node.bundle.output;

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
				newConfig.output.path = path.resolve(outputDir);
				newConfig.output.filename = path.resolve(outputFile);

				return newConfig;

			})(bundleConfig.node, NODE_BUNDLE_ENTRY, NODE_BUNDLE_OUTPUT_DIR, NODE_BUNDLE_OUTPUT_FILE);

		}

		if(isBrowserBundle) {
			var BROWSER_BUNDLE_ENTRY__OVERRIDE 		= processedConfig.browser.bundle.entry;
			var BROWSER_BUNDLE_OUTPUT_FILE__OVERRIDE= processedConfig.browser.bundle.output;

			var BROWSER_TEMPLATE_DIR__OVERRIDE 		= processedConfig.browser.template.dir;
			var BROWSER_TEMPLATE_PAGE_DIR__OVERRIDE = processedConfig.browser.template.page.dir;
			var BROWSER_TEMPLATE_PAGE_FILE__OVERRIDE= processedConfig.browser.template.page.file;
			var BROWSER_TEMPLATE_PAGE_DATA__OVERRIDE= processedConfig.browser.template.page.data;

			var BROWSER_BUNDLE_ENTRY = (function(overrideParam, defaultParam, inputDir) {
				if(overrideParam) {
					return `${inputDir}/${overrideParam}`;
				}
				else {
					return `${inputDir}/${defaultParam}`;
				}
			})(BROWSER_BUNDLE_ENTRY__OVERRIDE, DEFAULT_BROWSER_BUNDLE_ENTRY, BROWSER_DIR);

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
			node: isNode ? {
				test: isNodeTest ? {
					pattern: NODE_TEST_PATTERN ? NODE_TEST_PATTERN : false,
					options: NODE_TEST_PATTERN ? nodeTestConfig : false
				} : false,
				bundle: nodeBundleConfig ? nodeBundleConfig : false,
				server: isNodeServer ? {
					port: NODE_SERVER_PORT ? NODE_SERVER_PORT : false,
					serveDir: NODE_SERVER_SERVEDIR ? `${NODE_SERVER_SERVEDIR}` : false,
					render: NODE_SERVER_RENDER
				} : false
			} : false,
			browser: isBrowser ? {
				test: isBrowserTest ? {
					pattern: BROWSER_TEST_PATTERN ? BROWSER_TEST_PATTERN : false,
					options: BROWSER_TEST_OPTIONS ? BROWSER_TEST_OPTIONS : false
				} : false,
				bundle: browserBundleConfig ? browserBundleConfig : false
			} : false
		};
		
	}

	var publicAPI = {
		SolutionConfig
	};

	module.exports = publicAPI;
	
})();
