'use strict';
/*global desc, task, file, jake, rule, fail, complete, directory, namespace*/

(function() {

	// Uncomment and modify the following list to cause the build to fail unless these browsers are tested.
	var REQUIRED_BROWSERS = [
//    'IE 8.0.0 (Windows 7)',
//    'IE 9.0.0 (Windows 7)',
//    'Firefox 31.0.0 (Mac OS X 10.8)',
//    'Chrome 37.0.2062 (Mac OS X 10.8.5)',
//    'Safari 6.1.6 (Mac OS X 10.8.5)',
//    'Mobile Safari 7.0.0 (iOS 7.1)'
	];

	var shell = require('shelljs');
	var path = require('path');
	var fs = require('fs');


	var GENERATED_DIR = 'generated';
	var JSX_DIR = GENERATED_DIR + '/jsx';
	var BROWSERIFY_DIR = GENERATED_DIR + '/browserify';
	var COLLATED_CLIENT_DIR = GENERATED_DIR + '/client';
	var DEPLOY_DIR = GENERATED_DIR + '/deploy';

	var COLLECTION_DIR = 'src/collection/';

	var CLIENT_DIR = 'src/collection';
	var VENDOR_DIR = 'src/utilities';

	directory(GENERATED_DIR);
	directory(BROWSERIFY_DIR);
	directory(COLLATED_CLIENT_DIR);
	directory(DEPLOY_DIR);

	desc('Default Task');
	task('default', ['lint'], function() {
		console.log('Build OK');
	});

	desc('Lint All JS Files');
	task('lint', function() {
		
		var lintConfig = require('./build/config/eslint.config.js');
		var lintRunner = require('./build/utilities/lint-runner.js');

		var listES5 = new jake.FileList();
		listES5.include('**/*.js');
		listES5.exclude('src/collection/*');
		if (fs.existsSync('node_modules')) {
			listES5.exclude('node_modules/*');
		}
		if (fs.existsSync(GENERATED_DIR)) {
			listES5.exclude(GENERATED_DIR + '/*');
		}
		
		var listES6 = new jake.FileList();
		listES6.include('src/collection/**/*.js');
		listES6.include('src/collection/**/*.jsx');
		listES6.exclude('src/collection/*/*/generated/*');
		listES6.exclude('src/collection/*/*/deploy/*');

		var lintES5 = lintRunner.validateFiles(listES5.toArray(), lintConfig.es5Options);
		var lintES6 = lintRunner.validateFiles(listES6.toArray(), lintConfig.es6Options);

		if(!lintES5 || !lintES6) {
			fail('Lint Failed');
		}

	}, { async: true });

	namespace('browserTests', function() {

		var KarmaServer = require('karma').Server;

		var cfg = require('karma').config;
		var path = require('path');

		desc('Start Karma Server');
		task('start', function(sourceDirName) {

				var dependentTask = jake.Task['transpile:unit'];

				dependentTask.addListener('complete', function() {

					console.log('Start Test Unit Folder ~');

					var overrideConfig = {
						files: [
								'src/collection/'+sourceDirName+'/generated/**/*.js'
							],
						preprocessors: {}
					};

					overrideConfig.preprocessors['src/collection/'+sourceDirName+'/generated/**/*.js'] = ['browserify'];

					var karmaConfig = cfg.parseConfig(path.resolve('./build/config/karma.config.js'), overrideConfig);

					var serverInstance = new KarmaServer(karmaConfig, function(exitCode) {
						console.log('Karma has exited with ' + exitCode);
						process.exit(exitCode);
					});

					serverInstance.start();
					process.stdout.write('Capture the expected browsers');

					return sourceDirName;

				});

				dependentTask.invoke.apply(dependentTask, [sourceDirName]);

		});

		desc('Client Tests');
		task('run', function(sourceDirName) {

				var dependentTask = jake.Task['transpile:unit'];

				dependentTask.addListener('complete', function() {

					console.log('Running Test Unit Folder ~');

					var overrideConfig = {
						files: [
								'src/collection/'+sourceDirName+'/generated/**/*.js'
							],
						preprocessors: {}
					};

					overrideConfig.preprocessors['src/collection/'+sourceDirName+'/generated/**/*.js'] = ['browserify'];

					var karmaConfig = cfg.parseConfig(path.resolve('./build/config/karma.config.js'), overrideConfig);

					var runner = require('karma').runner;
					runner.run(karmaConfig, function(exitCode) {
						console.log('Karma has exited with ' + exitCode);
						process.exit(exitCode);
					});

					return sourceDirName;

				});

				dependentTask.invoke.apply(dependentTask, [sourceDirName]);

		});

	});

	desc('Server Tests');
	task('testInNode', function(sourceDirName){

		var SOURCE_DIR = COLLECTION_DIR + sourceDirName;

		var mochaConfig = require('./build/config/mocha.config.js');
		var mochaRunner = require('./build/utilities/mocha-runner.js');

		var testFiles = new jake.FileList();
		testFiles.include(SOURCE_DIR + '/**/*.js');
		testFiles.exclude('node_modules');

		mochaRunner.runTests(mochaConfig, testFiles);

	});

	desc('Run a Solution');
	task('runSolution', function(sourceDirName) {

		var SOURCE_DIR = COLLECTION_DIR + sourceDirName;
		var DEPLOY_DIR = SOURCE_DIR + '/deploy';
		var SERVE_DIR = DEPLOY_DIR + '/client';

		var host = 'localhost';
		var port = 3000;

		if (fs.existsSync(DEPLOY_DIR)) {
			var solution = require('./' + DEPLOY_DIR);

			solution.server.run(host, port, SERVE_DIR);
		}
		else {
			jake.exec(`node ${SOURCE_DIR}`, {printStdout: true});
		}

	});

	desc('Create deployable client files');
	namespace('build', function() {

		task('all', function() {
			process.stdout.write('Building deploy dir for all folders ~');
		});

		task('unit', function(sourceDirName) {

			if(!sourceDirName) {
				fail('Specify folder name for building - build:unit[folderName]');
			}
			else {

				var dependentTask = jake.Task['bundle:unit'];
				
				dependentTask.addListener('complete', function() {

					console.log('Building deploy dir for unit folder ~');

					var SOURCE_DIR = COLLECTION_DIR + sourceDirName;
					var CLIENT_DIR = SOURCE_DIR + '/client';
					var GENERATED_DIR = SOURCE_DIR + '/generated';
					var BROWSERIFY_DIR = GENERATED_DIR + '/bundle';
					var DEPLOY_DIR = SOURCE_DIR + '/deploy';
					var DEPLOY_CLIENT_DIR = DEPLOY_DIR + '/client';

					shell.rm('-rf', DEPLOY_DIR + '/*');
					shell.mkdir('-p', DEPLOY_DIR);
					shell.mkdir('-p', DEPLOY_CLIENT_DIR);

					shell.cp('-R',
							SOURCE_DIR + '/server',
							SOURCE_DIR + '/*.js',
						DEPLOY_DIR
					);

					shell.cp('-R',
							CLIENT_DIR + '/*.html',
							CLIENT_DIR + '/*.css',
							BROWSERIFY_DIR + '/*.js',
						DEPLOY_CLIENT_DIR
					);

					complete();

					return sourceDirName;

				});

				dependentTask.invoke.apply(dependentTask, [sourceDirName]);
				
			}

		}, { async: true });
		
		
	});

	namespace('bundle', function() {
		
		task('all', function() {
			process.stdout.write('Bundling all folders ~');
		});

		task('unit', function(sourceDirName) {

			if(!sourceDirName) {
				fail('Specify folder name for bundling - bundle:unit[folderName]');
			}
			else {

				var dependentTask = jake.Task['transpile:unit'];

				dependentTask.addListener('complete', function() {

					console.log('Bundling unit folder ~');

					var SOURCE_DIR = COLLECTION_DIR + sourceDirName;
					var GENERATED_DIR = SOURCE_DIR + '/generated';
					var COLLATED_CLIENT_DIR = GENERATED_DIR + '/client';
					var BROWSERIFY_DIR = GENERATED_DIR + '/bundle';

					shell.rm('-rf', BROWSERIFY_DIR + '/*');
					shell.mkdir('-p', BROWSERIFY_DIR);

					var browserifyRunner = require('./build/utilities/browserify-runner.js');

					browserifyRunner.bundle(COLLATED_CLIENT_DIR + '/app.js', BROWSERIFY_DIR + '/bundle.js', bundleComplete, fail);

					function bundleComplete() {
						complete();
					}

					return sourceDirName;


				});

				dependentTask.invoke.apply(dependentTask, [sourceDirName]);

				
			}

		}, { async: true });
		
	});

	namespace('transpile', function() {

		task('all', function() {
			process.stdout.write('Transpiling all folders ');
		});

		task('unit', function(sourceDirName) {

			if(!sourceDirName) {
				fail('Specify folder name for transpiling - transpile:unit[folderName]');
			}
			else {
				process.stdout.write('Transpiling unit folder ');

				var SOURCE_DIR = COLLECTION_DIR + sourceDirName;
				var CLIENT_DIR = SOURCE_DIR + '/client';
				var GENERATED_DIR = SOURCE_DIR + '/generated';
				var DEPLOY_DIR = SOURCE_DIR + '/deploy';

				shell.rm('-rf', GENERATED_DIR + '/*');
				shell.mkdir('-p', GENERATED_DIR);

				var babelConfig = require('./build/config/babel.config.js');
				var babelRunner = require('./build/utilities/babel-runner.js');

				var transpileFileList = new jake.FileList();
				transpileFileList.include(CLIENT_DIR + '/**/*.js');
				transpileFileList.include(CLIENT_DIR + '/**/*.jsx');

				var compileOptions = {
					presets: ['@babel/preset-react', '@babel/preset-env']
				};

				var transpileStatus = babelRunner.transformFiles(SOURCE_DIR, transpileFileList.toArray(), GENERATED_DIR, babelConfig);
				if (!transpileStatus) fail('Transpilation failed');

				complete();

			}

		}, { async: true });

	});

})();
