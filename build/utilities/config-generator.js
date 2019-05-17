'use strict';

(function() {

	var fs = require('fs');
	var path = require('path');
	var karmaConfigParser = require('karma').config;
	var glob = require('glob');
	var HtmlWebpackPlugin = require('html-webpack-plugin');
	var deepMerge = require('deepmerge');

	const AWS = require('aws-sdk');
	AWS.config.update({
		region: 'ap-south-1'
	});

	function replaceWithSSM(parameter, cache) {

		var ssmTagPattern = /(ssm:)(\W\w+)/;

		if(ssmTagPattern.test(parameter)) {
			let ssmParameterName = parameter.replace(ssmTagPattern, '$2');
			return cache[ssmParameterName];
		}
		else {
			return parameter;
		}
	}

	function SolutionConfig(DEFAULTS, solutionDir, commonConfigs, solutionConfigOptions) {

		var {
			DEFAULT_FOLDER_STRING,
			DEFAULT_DEV_MACHINE_NAME,
			DEFAULT_LINT__GLOBAL

		} = DEFAULTS;

		var {
			lintConfig,
			nodeTestConfig,
			browserTestConfig,
			transpileConfig,
			bundleConfig

		} = commonConfigs;

		var solutionConfig = solutionConfigOptions.solution;
		var solutionDependencies = solutionConfigOptions.dependencies;
		var solutionEnvironments = solutionConfigOptions.environments;
		

		var isNode = solutionConfig.node;
		var isBrowser = solutionConfig.browser;

		var isNodeTest = solutionConfig.node.test;
		var isBrowserTest = solutionConfig.browser.test;

		var isNodeBundle = solutionConfig.node.bundle;
		var isBrowserBundle = solutionConfig.browser.bundle;

		var isNodeServer = solutionConfig.node.server;
		var isNodeDB = solutionConfig.node.db;

		if(solutionEnvironments) {
			var isCloudDeploy = solutionEnvironments.cloud.enabled;
			var isDependencies = solutionEnvironments.cloud.includeDependencies;
			var solutionMetadata = solutionEnvironments.cloud.metadata;
		}

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

		var OUTPUT_DIR__PARAM = solutionConfig.dirs.outputDir;
		var OUTPUT_DIR__GROUP = (function(param, inputDir) {
			return `${inputDir}/${param}`;
		})(OUTPUT_DIR__PARAM, SOURCE_DIR);

		var DEVELOPMENT_DIR__PARAM = solutionConfig.dirs.developmentDir;
		var DEPLOY_DIR__PARAM = solutionConfig.dirs.deployDir;

		var OUTPUT_DIR = (function(outputDir, inputDir, devDir, deployDir, cloud) {
			if(outputDir && devDir) {
				return `${inputDir}/${outputDir}/${devDir}`;
			}
			else if(outputDir && deployDir && cloud) {
				return `${inputDir}/${outputDir}/${deployDir}`;
			}
			else {
				return `${inputDir}`;
			}
		})(OUTPUT_DIR__PARAM, SOURCE_DIR, DEVELOPMENT_DIR__PARAM, DEPLOY_DIR__PARAM, isCloudDeploy);

		
		if(isNodeServer) {
			var NODE_SERVER_SOLUTION_PARAMS = solutionConfig.node.server;
			var NODE_SERVER_RENDER = NODE_SERVER_SOLUTION_PARAMS.render;
		}

		if(isNodeDB) {

			var NODE_DB_ENV_PARAMS = solutionEnvironments.workstation.instance.parameters.db;
			var NODE_DB_SOLUTION_PARAMS = solutionConfig.node.db;

			var NODE_DB_PARAMS = (function(envParams, solutionParams) {
				return {
					connectionString: `${envParams.protocol}${envParams.username}:${envParams.password}@localhost:${envParams.port}/${solutionParams.name}`
				};
			})(NODE_DB_ENV_PARAMS, NODE_DB_SOLUTION_PARAMS);

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

				if(isCloudDeploy) {
					newConfig.mode = solutionEnvironments.cloud.mode;
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

				if(isCloudDeploy) {
					newConfig.mode = solutionEnvironments.cloud.mode;
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

			var NODE_SERVER_ENV_PARAMS = solutionEnvironments.workstation.instance.parameters.server;
			
			
			NODE_SERVER_ENV_PARAMS.serveDir = BROWSER_BUNDLE_OUTPUT_DIR__PARAM;

			var NODE_SERVER_PARAMS = (function(envParams, solutionParams) {
				return {
					port: envParams.port,
					serveDir: envParams.serveDir
				};
			})(NODE_SERVER_ENV_PARAMS, NODE_SERVER_SOLUTION_PARAMS);
		}

		if(isCloudDeploy) {

			var solutionPackages = solutionDependencies;
			var globalSolutionConfig = require('../../package.json');

			var solutionPkgConfig = (function(config, metadata, listings) {

				var dependenciesObj = {};

				listings.map(function(listing) {
					dependenciesObj[listing] = config['dependencies'][listing];
				});

				delete config.devDependencies;
				config.dependencies = dependenciesObj;
				config.name = metadata.name;
				
				return config;

			})(globalSolutionConfig, solutionMetadata, solutionPackages);

			var cloudInstancesDetails = solutionEnvironments.cloud.instances;

			var isCloudServer = solutionEnvironments.cloud.parameters.server;
			var isCloudDB = solutionEnvironments.cloud.parameters.db;

			var ssmParameterCache = (function(dir) {

				var cacheFile = path.resolve(`${dir}/.tmp/aws.cache.json`);

				if(fs.existsSync(cacheFile)) {
					return require(cacheFile);
				}
				else {
					return false;
				}
				
			})(SOURCE_DIR);

			if(isCloudServer) {

				var NODE_CLOUD_SERVER_ENV_PARAMS = solutionEnvironments.cloud.parameters.server;
				
				NODE_CLOUD_SERVER_ENV_PARAMS.serveDir = BROWSER_BUNDLE_OUTPUT_DIR__PARAM;

				var NODE_CLOUD_SERVER_PARAMS = (function(envParams) {
					let ssmResolvedParams = {};
					
					for(let param in envParams) {
						ssmResolvedParams[param] = replaceWithSSM(envParams[param], ssmParameterCache);
					}

					return {
						port: ssmResolvedParams.port,
						serveDir: ssmResolvedParams.serveDir
					};
				})(NODE_CLOUD_SERVER_ENV_PARAMS);
			}

			if(isCloudDB) {

				var NODE_CLOUD_DB_ENV_PARAMS = solutionEnvironments.cloud.parameters.db;
				var NODE_CLOUD_DB_SOLUTION_PARAMS = solutionConfig.node.db;

				var NODE_CLOUD_DB_PARAMS = (function(envParams, solutionParams) {
					let ssmResolvedParams = {};

					for(let param in envParams) {
						ssmResolvedParams[param] = replaceWithSSM(envParams[param], ssmParameterCache);
					}

					return {
						connectionString: `${ssmResolvedParams.protocol}${ssmResolvedParams.username}:${ssmResolvedParams.password}@localhost:${ssmResolvedParams.port}/${solutionParams.name}`
					};
				})(NODE_CLOUD_DB_ENV_PARAMS, NODE_CLOUD_DB_SOLUTION_PARAMS);

			}

			var ec2_service = new AWS.EC2({
				apiVersion: '2016-11-15'
			});

			var { instances } = solutionEnvironments.cloud;

			var solutionCommands = (function(instances) {

				var commandsObj = {};

				instances.map(function(instance) {

					var instanceTags = instance.config.filters;
					var instanceCommands = instance.commands;

					for(var command in instanceCommands) {
						commandsObj[command] = {};
						commandsObj[command]['DocumentName'] = instanceCommands[command]['documentType']; 
						commandsObj[command]['Parameters'] = {};
						commandsObj[command]['Parameters']['commands'] = instanceCommands[command]['commands'];
						commandsObj[command]['instanceTags'] = instanceTags;
					}
					
				});

				return commandsObj;
				
			})(instances);

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
						`!${OUTPUT_DIR__GROUP}/**/*.js`
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
				env: {
					workstation: !isCloudDeploy ? {
						parameters: {
							server: NODE_SERVER_PARAMS ? NODE_SERVER_PARAMS : false,
							db: NODE_DB_PARAMS ? NODE_DB_PARAMS : false
						}
					} : false
				}
			} : false,
			run: !isCloudDeploy ? {
				dir: NODE_MAIN_FILE ? NODE_MAIN_FILE : OUTPUT_DIR
			} : false,
			deploy: isCloudDeploy ? {
				preqs: {
					instances: cloudInstancesDetails ? cloudInstancesDetails : false
				},
				prepare: {
					includeDependencies: isDependencies ? isDependencies : false,
					solutionPkgConfig: solutionPkgConfig ? solutionPkgConfig : false
				},
				parameters: {
					env: {
						server: NODE_CLOUD_SERVER_PARAMS ? NODE_CLOUD_SERVER_PARAMS : false,
						db: NODE_CLOUD_DB_PARAMS ? NODE_CLOUD_DB_PARAMS : false	
					}
				},
				commands: solutionCommands ? solutionCommands : false

			} : false
		};
		
	}

	var publicAPI = {
		SolutionConfig
	};

	module.exports = publicAPI;
	
})();
