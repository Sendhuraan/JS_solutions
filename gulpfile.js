'use strict';

(function() {

	const { src, series, parallel, watch } = require('gulp');
	var program = require('commander');
	var fileList = require('filelist');
	var fs = require('fs');
	var path = require('path');
	const eslint = require('gulp-eslint');
	var webpack = require('webpack');
	var KarmaServer = require('karma').Server;
	var KarmaRunner = require('karma').runner;
	var cfg = require('karma').config;
	var shell = require('shelljs');
	var child_process = require('child_process');
	var HtmlWebpackPlugin = require('html-webpack-plugin');
	var globby = require('globby');

	program
		.option('-d --dir <value>', 'Input folder name')
		.option('--node', 'Bundle client code')
		.option('--browser', 'Bundle server code')
		.option('--jsx', 'Entry point as JSX file')
		.option('--serverRender', 'Enable server render')
		.parse(process.argv);

	// var COLLECTION_DIR = 'src/collection/';
	var DIRNAME = program.dir;
	// var SOURCE_DIR = COLLECTION_DIR + DIRNAME;
	// var SERVER_DIR = SOURCE_DIR + '/server';
	// var CLIENT_DIR = SOURCE_DIR + '/client';
	// var GENERATED_DIR = SOURCE_DIR + '/generated';
	// var BROWSERIFY_DIR = GENERATED_DIR + '/bundle';
	// var DEPLOY_DIR = SOURCE_DIR + '/deploy';
	// var DEPLOY_SERVER_DIR = DEPLOY_DIR + '/server';
	// var DEPLOY_CLIENT_DIR = DEPLOY_DIR + '/client';
	// var SERVE_DIR = DEPLOY_DIR + '/client';

	// var TEMPLATE_DIR = CLIENT_DIR + '/templates';
	// var TEMPLATE_FILENAME = 'index.js';
	// var TEMPLATE_DATAFILE = 'index.data.json';


	// var DEFAULT_BUNDLE_ENTRY__NODE 			= 'index';
	// var DEFAULT_BUNDLE_OUTPUT__NODE 		= DEPLOY_DIR + 'index.js';
	// //var DEFAULT_BUNDLE_EXTENSIONS__NODE 	= ['.js'];

	// var DEFAULT_BUNDLE_ENTRY__BROWSER 		= CLIENT_DIR + 'index';
	// var DEFAULT_BUNDLE_OUTPUT_DIR__BROWSER 	= DEPLOY_CLIENT_DIR + 'bundle.js';
	// //var DEFAULT_BUNDLE_EXTENSIONS__BROWSER 	= ['.js', '.jsx'];

	// var DEFAULT_TEST_DIR__NODE 				= SERVER_DIR;
	// var DEFAULT_TEST_PATTERN__NODE 			= '_test';
	// //var DEFAULT_TEST_EXTENSIONS__NODE 		= ['.js'];

	// var DEFAULT_TEST_DIR__BROWSER 			= CLIENT_DIR;
	// var DEFAULT_TEST_PATTERN__BROWSER 		= '_test';
	// //var DEFAULT_TEST_EXTENSIONS__BROWSER 	= ['.js', '.jsx'];

	// var isBundle_browser = program.browser;
	// var isBundle_node = program.node;
	// var isEntryPoint_JSX = program.jsx;
	// var isServerRender = program.serverRender;

	// var eslintConfig = require('./build/config/eslint.config.js');
	// var webpackConfig = require('./build/config/webpack.config.js');

	var commonConfigs = {
		lintConfig: require('./build/config/eslint.config.js'),
		nodeTestConfig: require('./build/config/mocha.config.js'),
		browserTestConfig: { path: './build/config/karma.config.js' },
		transpileConfig: require('./build/config/babel.config.js'),
		bundleConfig: require('./build/config/webpack.config.js')
	};

	var { SolutionConfig } = require('./build/utilities/config-generator');
	var DEFAULTS = require(`./build/config/constants`).defaults;

	var pageConfig = (function(dir) {
		var path = `./src/collection/${dir}/config`;

		if(fs.existsSync(path)) {
			return require(path);
		}
		else {
			return {};
		}
	})(DIRNAME);

	var sourceDir = (function(dir) {
		var path = `./src/collection/${dir}`;

		if(!dir) {
			throw new Error('NO FOLDER NAME SPECIFIED');
		}
		else if(!fs.existsSync(path)) {
			throw new Error('FOLDER DOES NOT EXISTS');
		}
		else {
			return dir;
		}
	})(DIRNAME);

	var { config } = new SolutionConfig(DEFAULTS, sourceDir, commonConfigs, pageConfig);
	
	

	function testSolution(cb) {
		console.log(JSON.stringify(config, null, 4));
		//new SolutionConfig(DEFAULTS, program.dir, commonConfigs, pageConfig)
		//console.log(new FolderNamesGenerator(DEFAULTS, program.dir, [], pageConfig));
		cb();
	}

	function lintGlobalFiles(cb) {
		var { lint } = config;

		if(!lint.global.pattern) {
			cb(new Error('GLOBAL LINT NOT CONFIGURED'));
		}
		else {
			return src(globby.sync(lint.global.pattern))
			.pipe(eslint(lint.global.options))
			.pipe(eslint.format())
			.pipe(eslint.failAfterError());

			cb();
		}
		
		
	}

	function lintSourceFiles(cb) {
		var { lint } = config;

		if(!lint.global.pattern) {
			cb(new Error('SOURCE LINT NOT CONFIGURED'));
		}
		else {
			return src(lint.source.pattern)
			.pipe(eslint(lint.source.options))
			.pipe(eslint.format())
			.pipe(eslint.failAfterError());

			cb();
		}
	}

	function runNodeTests(cb){
		var mochaRunner = require('./build/utilities/mocha-runner.js');
		var { test } = config.node;

		if(!test) {
			cb(new Error('NODE TEST NOT CONFIGURED'))
		}
		else {
			mochaRunner.runTests(globby.sync(test.pattern), test.options);
			cb();
		}
	}

	function displayWebpackErrorMsg(err, stats) {
		if (err) {
			console.error(err.stack || err);
		if (err.details) {
			console.error(err.details);
		}
			return;
		}

		const info = stats.toJson();

		if (stats.hasErrors()) {
			console.error(info.errors);
		}

		if (stats.hasWarnings()) {
			console.warn(info.warnings);
		}
	}

	function bundle(cb) {

		var isBundle_node = config.node.bundle;
		var isBundle_browser = config.browser.bundle;

		if(!(isBundle_node || isBundle_browser)) {
			cb(new Error('NODE AND BROWSER BUNDLE NOT CONFIGURED'));
		}

		else {

			if(isBundle_node) {
				let { path } = config.node.bundle.output;
				let { bundle } = config.node;
				shell.rm('-rf', path);

				webpack(bundle, displayWebpackErrorMsg);
				cb();
			}

			if(isBundle_browser) {
				let { path } = config.browser.bundle.output;
				let { bundle } = config.browser;
				shell.rm('-rf', path);

				webpack(bundle, displayWebpackErrorMsg);
				cb();
			}

		}
	}

	function copyServerFiles(cb) {

		if(!program.dir) {
			cb(new Error('NO FOLDER NAME SPECIFIED'));
		}
		else if(!fs.existsSync(SOURCE_DIR)) {
			cb(new Error('FOLDER DOES NOT EXISTS'));
		}
		else {
			shell.rm('-rf', DEPLOY_SERVER_DIR + '/*');
			shell.mkdir('-p', DEPLOY_DIR);
			shell.mkdir('-p', DEPLOY_CLIENT_DIR);

			shell.cp('-R',
					SOURCE_DIR + '/server',
					SOURCE_DIR + '/*.js',
				DEPLOY_DIR
			);

			cb();
		}
	}

	function startAndCaptureTestBrowsers(cb) {
		var { test } = config.browser;

		if(!test) {
			cb(new Error('BROWSER TEST NOT CONFIGURED'));
		}

		else {

			var serverInstance = new KarmaServer(test.options, function(exitCode) {
				console.log('Karma has exited with ' + exitCode);
			});

			serverInstance.start();

			serverInstance.on('listening', function (browser) {
				console.log('CAPTURE THE REQUIRED BROWSERS...');
			});

			serverInstance.on('browser_register', function (browser) {
				console.log(`${browser.name} was registered.`);
				cb();
			});
		}
		
	}

	function runBrowserTests(cb) {
		var { test } = config.browser;

		if(!test) {
			cb(new Error('BROWSER TEST NOT CONFIGURED'));
		}
		else {
			KarmaRunner.run(test.options, function(exitCode) {
				console.log('Karma has exited with ' + exitCode);
			});
			cb();
		}
		
	}

	function runSolution(cb) {

		fs.access(DEPLOY_DIR, fs.constants.F_OK, (err) => {
			if (err) {
				child_process.fork(`${SOURCE_DIR}`);
				cb();
			}
			else {
				child_process.fork(`${DEPLOY_DIR}`);
				cb();
			}
		});

	}

	
	// function watchServerFiles(cb) {

	// 	var sourceDir = path.resolve(SOURCE_DIR+'/*.js');
	// 	var serverDir = path.resolve(SERVER_DIR+'/**/*.js');

	// 	if(!program.dir) {
	// 		cb(new Error('NO FOLDER NAME SPECIFIED'));
	// 	}
	// 	else if(!fs.existsSync(SOURCE_DIR)) {
	// 		cb(new Error('FOLDER DOES NOT EXISTS'));
	// 	}
	// 	else {
	// 		watch([sourceDir, serverDir], series(lintSourceFiles, runNodeTests, copyServerFiles));
	// 		cb();
	// 	}
		
	// }

	// function watchClientFiles(cb) {

	// 	if(!program.dir) {
	// 		cb(new Error('NO FOLDER NAME SPECIFIED'));
	// 	}
	// 	else if(!fs.existsSync(SOURCE_DIR)) {
	// 		cb(new Error('FOLDER DOES NOT EXISTS'));
	// 	}
	// 	else {
	// 		watch([CLIENT_DIR+'/**/*'], series(lintSourceFiles, runBrowserTests, bundle));
	// 		cb();
	// 	}
		
	// }

	// function watchGlobalFiles(cb) {
	// 	watch(['**/*.js', '!node_modules/**', '!src/collection/**'], lintGlobalFiles);
	// 	cb();
	// }

	const lint = parallel(lintGlobalFiles, lintSourceFiles);

	exports.lint = lint;
	exports.runNodeTests = runNodeTests;
	exports.startAndCaptureTestBrowsers = startAndCaptureTestBrowsers;
	exports.runBrowserTests = runBrowserTests;
	exports.bundle = bundle;
	exports.copyServerFiles = copyServerFiles;
	exports.runSolution = runSolution;

	exports.testSolution = testSolution;

	// exports.watchServerFiles = watchServerFiles;
	// exports.watchGlobalFiles = watchGlobalFiles;

	// const webTests = series(runNodeTests, startAndCaptureTestBrowsers, runBrowserTests);
	// const webDefault = series(lint, bundle, copyServerFiles);
	// const webWatch = parallel(watchGlobalFiles, watchServerFiles, watchClientFiles);

	// exports.webTests = webTests;
	// exports.webDefault = webDefault;
	// exports.webWatch = webWatch;
	// exports.webTestsWatch = series(webTests, webDefault, webWatch);

	// exports.default = parallel(watchGlobalFiles, watchServerFiles, watchClientFiles);
	
})();
