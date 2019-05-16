'use strict';

(function() {
	var fs = require('fs');
	var path = require('path');

	const { src, series, parallel, watch, dest } = require('gulp');
	var program = require('commander');
	const eslint = require('gulp-eslint');
	var webpack = require('webpack');
	var KarmaServer = require('karma').Server;
	var KarmaRunner = require('karma').runner;
	var shell = require('shelljs');
	var child_process = require('child_process');
	var globby = require('globby');
	const inquirer = require('inquirer');
	const AWS = require('aws-sdk');
	AWS.config.update({
		region: 'ap-south-1'
	});

	program
		.option('-d --dir <value>', 'Input folder name')
		.option('-env --environment <value>', 'Build environment')
		.option('--debug <value>', 'Build environment')
		.parse(process.argv);

	var DIRNAME = program.dir;
	var ENV_TYPE = program.environment;
	var DEBUG_PORT = Number(program.debug);

	var commonConfigs = {
		lintConfig: require('./build/config/eslint.config.js'),
		nodeTestConfig: require('./build/config/mocha.config.js'),
		browserTestConfig: { path: './build/config/karma.config.js' },
		transpileConfig: require('./build/config/babel.config.js'),
		bundleConfig: require('./build/config/webpack.config.js')
	};

	var { SolutionConfig } = require('./build/utilities/config-generator');
	var DEFAULTS = require('./build/config/constants').defaults;

	var pageConfigOptions = (function(dir) {
		var path = `./src/collection/${dir}/config`;

		if(fs.existsSync(path)) {
			return require(path);
		}
		else {
			throw new Error('NO CONFIG FOUND FOR SOLUTION');
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

	var { config } = new SolutionConfig(DEFAULTS, sourceDir, commonConfigs, pageConfigOptions);
	
	function printConfig(cb) {
		console.log(JSON.stringify(config, null, 4));
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
			cb();
		}
		else {
			mochaRunner.runTests(globby.sync(test.pattern), test.options, cb);
		}
	}

	function startAndCaptureTestBrowsers(cb) {
		var { test } = config.browser;

		if(!test) {
			cb();
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
			cb();
		}
		else {
			KarmaRunner.run(test.options, function(exitCode) {
				if(exitCode) {
					cb(new Error('Browser Tests Failed'));
				}
				else {
					cb();
				}
				
			});
		}
	}

	function cleanOutputDir(cb) {
		var isBundle_node = config.node.bundle;
		var isBundle_browser = config.browser.bundle;

		if(isBundle_node || isBundle_browser) {
			var { output } = config.build.dirs;
			shell.rm('-rf', `${output}/*`);
			cb();
		}
		else {
			cb();
		}
	}

	function bundleNode(cb) {

		var isBundle_node = config.node.bundle;

		if(!isBundle_node) {
			cb();
		}
		else {
			let { path } = config.node.bundle.output;
			let { bundle } = config.node;
			shell.rm('-rf', path);

			webpack(bundle, function(err, stats) {
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

				cb();
			});
		}
	}

	function bundleBrowser(cb) {

		var isBundle_browser = config.browser.bundle;

		if(!isBundle_browser) {
			cb();
		}
		else {
			let { path } = config.browser.bundle.output;
			let { bundle } = config.browser;

			shell.rm('-rf', path);

			webpack(bundle, function(err, stats) {
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

				cb();
			});
		}
	}

	function copyServerFiles() {
		var { source, node, output, serve } = config.build.dirs;
		
		shell.rm('-rf', `${output}/*.js`);
		shell.mkdir('-p', output);
		shell.mkdir('-p', serve);

		shell.cp('-R',
				`${node}`,
				`${source}/*.js`,
			`${output}`
		);
	}

	function build(cb) {

		var { build } = config;
		var { deploy } = config;

		if(!build) {
			cb();
		}
		else {
			var { parameters } = config.build.env.workstation;
			var { output } = config.build.dirs;
			var { bundle } = config.node;

			if(!bundle) {
				copyServerFiles();
			}

			if(!deploy) {
				shell.rm('-rf', `${output}/*.json`);

				fs.writeFile(`${output}/env.json`, JSON.stringify(parameters, null, 4), function(err) {
					if(err) {
						throw err;
					}
					else {
						cb();
					}
				});
			}
			else {
				cb();
			}
		}
	}

	function runSolution(cb) {
		var { dir } = config.run;
		var solutionProcess;

		if(!DEBUG_PORT) {
			solutionProcess = child_process.fork(`${dir}`);
		}
		else {
			solutionProcess = child_process.fork(`${dir}`, [], {
				execArgv: [`--inspect-brk=${DEBUG_PORT}`]
			});
			console.log(`Open chrome://inspect. If no target was found, click configure and add localhost:${DEBUG_PORT}`);
		}

		solutionProcess.on('exit', function() {
			cb();
		});
	}



	function prepareDeployment(cb) {
		var { solutionPkgConfig } = config.deploy.prepare;
		var { includeDependencies } = config.deploy.prepare;
		var { output } = config.build.dirs;

		shell.cp('package-lock.json', `${output}`);
		fs.writeFileSync(`${output}/package.json`, JSON.stringify(solutionPkgConfig, null, 4));

		if(includeDependencies) {
			shell.cp('-rf', 'node_modules/', `${output}`);
			child_process.execSync('npm prune --production', {
				cwd: path.resolve(`${output}`)
			});
		}

		child_process.execSync('rm -rf *', {
			cwd: path.resolve('../JS_deploy')
		});

		child_process.execSync('rm -rf .git', {
			cwd: path.resolve('../JS_deploy')
		});

		child_process.execSync('git init', {
			cwd: path.resolve('../JS_deploy')
		});

		child_process.execSync('git remote add origin git@github.com:Sendhuraan/JS_deploy.git', {
			cwd: path.resolve('../JS_deploy')
		});

		shell.cp('-rf', `${output}/*`, '../JS_deploy');

		child_process.execSync('git add .', {
			cwd: path.resolve('../JS_deploy')
		});

		child_process.execSync('git commit -m "Solution Deployment"', {
			cwd: path.resolve('../JS_deploy')
		});

		child_process.execSync('git push origin master -f', {
			cwd: path.resolve('../JS_deploy')
		});

		cb();
	}

	function validateSolution(cb) {
		var { deploy } = config;

		if(deploy) {
			cb(new Error('DEPLOYMENT CONFIGURED FOR DEVELOPMENT. DISABLE CLOUD CONFIG TO PROCEED'));
		}
		else {
			cb();
		}
	}

	function validateDeployment(cb) {
		var { deploy } = config;

		if(!deploy) {
			cb(new Error('DEPLOYMENT NOT CONFIGURED'));
		}
		else {
			cb();
		}
	}

	function startOrCreateCloudInstances(cb) {
		
		var { instances } = config.deploy.preqs;

		var ec2_service = new AWS.EC2({
			apiVersion: '2016-11-15'
		});

		instances.map(async function(instance) {

			var instanceFilters = {
				Filters: instance.config.filters
			};

			var instanceDetails = await ec2_service.describeInstances(instanceFilters).promise();

			if(instanceDetails.Reservations.length) {
				var instanceId = instanceDetails.Reservations[0].Instances.map(function(instance) {
					return instance.InstanceId;
				});

				var startInstanceDetails = {
					InstanceIds: instanceId
				};

				var startedInstanceDetails = await ec2_service.startInstances(startInstanceDetails).promise();

				console.log(startedInstanceDetails);
			}
			else {

				console.log('Instance not Found');
				console.log('Creating new instance');

				var describeVpcs_Response = await ec2_service.describeVpcs().promise();

				console.log(describeVpcs_Response.Vpcs[0].VpcId);

				var paramsSecurityGroup = instance.setup.securityGroup.metadata;
				paramsSecurityGroup.VpcId = describeVpcs_Response.Vpcs[0].VpcId;

				var createSecurityGroup_Response = await ec2_service.createSecurityGroup(paramsSecurityGroup).promise();

				console.log(`Security Group (${createSecurityGroup_Response.GroupId}) Created!`);

				var paramsIngress = {
					GroupId: createSecurityGroup_Response.GroupId,
					IpPermissions: instance.setup.securityGroup.parameters.IpPermissions
				};

				var securityGroup = await ec2_service.authorizeSecurityGroupIngress(paramsIngress).promise();

				console.log('Rules Added to Security Group');

				var instanceParams = instance.setup.compute.parameters;

				instanceParams.SecurityGroupIds.push(createSecurityGroup_Response.GroupId);

				if(instanceParams.UserData) {
					instanceParams.UserData = new Buffer(instanceParams.UserData.join('\n')).toString('base64');
				}
				
				console.log(instanceParams);

				var ec2_instances = await ec2_service.runInstances(instanceParams).promise();

				ec2_instances.Instances.map(function(instance) {
					console.log(`Instance (ID: ${instance.InstanceId}) Created`);
				});
			}
		});

		cb();

	}

	function executeCommand() {
		console.log('Command Executed');
	}

	async function listCommands(cb) {
		executeCommand();

		var interactions = [
			{
				type: 'input',
				name: 'reinitiate',
				message: 'Do you want to run another command (y/n) : '
			}
		];

		const userInput = await inquirer.prompt(interactions);

		if(userInput.reinitiate === 'y') {
			listCommands();
			return;
		}
		else if (userInput.reinitiate === 'n') {
			console.log('Exiting Command Menu');
		}
		else {
			console.log('Please enter y for Yes / n for No');
		}

	}

	
	function transformFiles(cb) {
		var { test } = config.node;
		var { dir } = config.run;

		var { transpileFiles } = require('./build/utilities/transpile-runner');
		var { browser } = require('./build/config/babel.config.js');

		return src(test.pattern)
		.pipe(transpileFiles(browser))
		.pipe(dest(`${dir}/output`));

		cb();
		
	}

	const lint = parallel(lintGlobalFiles, lintSourceFiles);
	const bundle = series(bundleNode, bundleBrowser);
	const prepareSolution = series(lint, runNodeTests, runBrowserTests, cleanOutputDir, bundle, build);
	const deploy = series(validateDeployment, prepareSolution, prepareDeployment, listCommands);

	exports.lint = lint;
	exports.runNodeTests = runNodeTests;
	exports.startAndCaptureTestBrowsers = startAndCaptureTestBrowsers;
	exports.runBrowserTests = runBrowserTests;
	exports.bundle = bundle;
	exports.build = build;
	exports.copyServerFiles = copyServerFiles;
	exports.runSolution = runSolution;
	exports.deploy = deploy;
	exports.transformFiles = transformFiles;

	exports.printConfig = printConfig;
	exports.listCommands = listCommands;

	exports.developmentPreqs = series(startAndCaptureTestBrowsers);
	exports.deploymentPreqs = series(startOrCreateCloudInstances);
	exports.default = series(validateSolution, prepareSolution, runSolution);
	
})();
