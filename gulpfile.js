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
	var cfg = require('karma').config;
	var shell = require('shelljs');
	var child_process = require('child_process');

	program
		.option('-d --dir <value>', 'Input folder name')
		.parse(process.argv);

	console.log(program.dir);

	var COLLECTION_DIR = 'src/collection/';
	var SOURCE_DIR = COLLECTION_DIR + program.dir;
	var SERVER_DIR = SOURCE_DIR + '/server';
	var CLIENT_DIR = SOURCE_DIR + '/client';
	var GENERATED_DIR = SOURCE_DIR + '/generated';
	var BROWSERIFY_DIR = GENERATED_DIR + '/bundle';
	var DEPLOY_DIR = SOURCE_DIR + '/deploy';
	var DEPLOY_SERVER_DIR = DEPLOY_DIR + '/server';
	var DEPLOY_CLIENT_DIR = DEPLOY_DIR + '/client';
	var SERVE_DIR = DEPLOY_DIR + '/client';

	var eslintConfig = require('./build/config/eslint.config.js');
	var webpackConfig = require('./build/config/webpack.config.js');

	function lintGlobalFiles(cb) {
		return src([
			'**/*.js',
			'!node_modules/**',
			'!src/collection/**'
		])
		.pipe(eslint(eslintConfig.es5Options))
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());

		cb();
	}

	function lintSourceFiles(cb) {

		if(!program.dir) {
			cb(new Error('NO FOLDER NAME SPECIFIED'));
		}
		else if(!fs.existsSync(SOURCE_DIR)) {
			cb(new Error('FOLDER DOES NOT EXISTS'));
		}
		else {
			var sourceFiles = new fileList.FileList();
			sourceFiles.include(`${SOURCE_DIR}/**/*.js`);
			sourceFiles.include(`${SOURCE_DIR}/**/*.jsx`);
			if(fs.existsSync(GENERATED_DIR)) {
				sourceFiles.exclude(`${GENERATED_DIR}/**/*.js`);
			}
			if(fs.existsSync(DEPLOY_DIR)) {
				sourceFiles.exclude(`${DEPLOY_DIR}/**/*.js`);
			}

			return src(sourceFiles.toArray())
			.pipe(eslint(eslintConfig.es6Options))
			.pipe(eslint.format())
			.pipe(eslint.failAfterError());

			cb();
		}
	}

	function runServerTests(cb){

		if(!program.dir) {
			cb(new Error('NO FOLDER NAME SPECIFIED'));
		}
		else if(!fs.existsSync(SOURCE_DIR)) {
			cb(new Error('FOLDER DOES NOT EXISTS'));
		}
		else {
			var mochaConfig = require('./build/config/mocha.config.js');
			var mochaRunner = require('./build/utilities/mocha-runner.js');

			var testFiles = new fileList.FileList();
			testFiles.include(SOURCE_DIR + '/**/*_test.js');
			testFiles.exclude('node_modules');

			mochaRunner.runTests(mochaConfig, testFiles);

			cb();
		}
	}

	function bundle(cb) {

		if(!program.dir) {
			cb(new Error('NO FOLDER NAME SPECIFIED'));
		}
		else if(!fs.existsSync(SOURCE_DIR)) {
			cb(new Error('FOLDER DOES NOT EXISTS'));
		}
		else {

			var webpackEntryPoint = `${CLIENT_DIR}/index.jsx`;
			var webpackOutput = `${DEPLOY_CLIENT_DIR}`;

			webpackConfig.entry = path.resolve(webpackEntryPoint);
			webpackConfig.output.path = path.resolve(webpackOutput);

			webpack(webpackConfig, (err, stats) => {
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

				});

			cb();
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

	function startBrowserTestServer(cb) {

		if(!program.dir) {
			cb(new Error('NO FOLDER NAME SPECIFIED'));
		}
		else if(!fs.existsSync(SOURCE_DIR)) {
			cb(new Error('FOLDER DOES NOT EXISTS'));
		}
		else {
			var overrideConfig = {
				files: [
						CLIENT_DIR + '/**/*.js',
						CLIENT_DIR + '/**/*.jsx'
					],
				preprocessors: {}
			};

			overrideConfig.preprocessors[CLIENT_DIR + '/**/*.js'] = ['webpack'];
			overrideConfig.preprocessors[CLIENT_DIR + '/**/*.jsx'] = ['webpack'];
			overrideConfig.webpack = {
				'module': webpackConfig.module
			};

			var karmaConfig = cfg.parseConfig(path.resolve('./build/config/karma.config.js'), overrideConfig);

			var serverInstance = new KarmaServer(karmaConfig, function(exitCode) {
				console.log('Karma has exited with ' + exitCode);
			});

			serverInstance.start();
			process.stdout.write('Capture the expected browsers');

			cb();
		}
		
	}

	function runBrowserTests(cb) {

		if(!program.dir) {
			cb(new Error('NO FOLDER NAME SPECIFIED'));
		}
		else if(!fs.existsSync(SOURCE_DIR)) {
			cb(new Error('FOLDER DOES NOT EXISTS'));
		}
		else {
			var overrideConfig = {
				files: [
						CLIENT_DIR + '/**/*.js',
						CLIENT_DIR + '/**/*.jsx'
					],
				preprocessors: {}
			};

			overrideConfig.preprocessors[CLIENT_DIR + '/**/*.js'] = ['webpack'];
			overrideConfig.preprocessors[CLIENT_DIR + '/**/*.jsx'] = ['webpack'];
			overrideConfig.webpack = {
				'module': webpackConfig.module
			};

			var karmaConfig = cfg.parseConfig(path.resolve('./build/config/karma.config.js'), overrideConfig);

			var runner = require('karma').runner;
			runner.run(karmaConfig, function(exitCode) {
				console.log('Karma has exited with ' + exitCode);
			});

			cb();
		}
		
	}

	function runSolution(cb) {
		
		var host = 'localhost';
		var port = 3000;

		if (fs.existsSync(DEPLOY_DIR)) {
			var solution = require('./' + DEPLOY_DIR);
			solution.server.run(host, port, SERVE_DIR);
		}
		else {
			child_process.exec(`node ${SOURCE_DIR}`, function(error, stdout, stderr) {
				if (error) {
					console.log(error.stack);
					console.log('Error code: '+error.code);
					console.log('Signal received: '+error.signal);
				}
				console.log('stdout: ' + stdout);
				console.log('stderr: ' + stderr);
			});
		}

		cb();

	}

	function watchServerFiles(cb) {

		if(!program.dir) {
			cb(new Error('NO FOLDER NAME SPECIFIED'));
		}
		else if(!fs.existsSync(SOURCE_DIR)) {
			cb(new Error('FOLDER DOES NOT EXISTS'));
		}
		else {
			watch([`${SERVER_DIR}/**/*`], series(lintSourceFiles, runServerTests, copyServerFiles));
			cb();
		}
		
	}

	function watchClientFiles(cb) {

		if(!program.dir) {
			cb(new Error('NO FOLDER NAME SPECIFIED'));
		}
		else if(!fs.existsSync(SOURCE_DIR)) {
			cb(new Error('FOLDER DOES NOT EXISTS'));
		}
		else {
			watch([`${CLIENT_DIR}/**/*`], series(lintSourceFiles, runBrowserTests, bundle));
			cb();
		}
		
	}

	function watchGlobalFiles(cb) {

		if(!program.dir) {
			cb(new Error('NO FOLDER NAME SPECIFIED'));
		}
		else if(!fs.existsSync(SOURCE_DIR)) {
			cb(new Error('FOLDER DOES NOT EXISTS'));
		}
		else {
			watch(['**/*, !src/collection/*, !node_modules/*'], lintGlobalFiles);
			cb();
		}
	}

	const lint = parallel(lintGlobalFiles, lintSourceFiles);

	exports.lint = lint;
	exports.runServerTests = runServerTests;
	exports.startBrowserTestServer = startBrowserTestServer;
	exports.runBrowserTests = runBrowserTests;
	exports.bundle = bundle;
	exports.copyServerFiles = copyServerFiles;
	exports.runSolution = runSolution;
	exports.watchServerFiles = watchServerFiles;
	exports.default = parallel(series(lint, ), watchGlobalFiles, watchServerFiles, watchClientFiles);
	
})();
