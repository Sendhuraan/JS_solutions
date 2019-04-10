(function() {

	var dependencies = require('./dependencies.json').dependencies;

	var config = {
		node: {
			// remove dir to set source dir.
			dir: 'server',
			test: false,
			bundle: false,
			server: {
				render: false,
				serveDir: 'client',
				development: {
					port: 3000
				},
				stage: {
					port: '/Server/Stage/Port'
				}
			},
			db: {
				protocol: 'mongodb://',
				development: {
					username: 'local',
					password: 'pass',
					port: 27017,
					dbName: 'mongodb-cookbook-examples_01_inserting-records_users'
				},
				stage: {
					username: '/DB/Mongo/Stage/Username',
					password: '/DB/Mongo/Stage/Password',
					port: '/DB/Mongo/Stage/Port',
					dbName: 'mongodb-cookbook-examples_01_inserting-records_users'
				}
			},
			outputDir: 'deploy'
		},
		browser: {
			// remove dir to set source dir.
			dir: 'client',
			test: {
				pattern: ['**/*_test.jsx']
			},
			bundle: {
				entry: 'index.jsx',
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
		},
		deploy: {
			cloudService: 'aws',
			environmentTags: ['server', 'stage'],
			getParameters: [
				'node.server.stage.port',
				'node.db.stage.username',
				'node.db.stage.password',
				'node.db.stage.port'
			],
			includeDependencies: false
		}
	};

	var publicAPI = {
		config,
		dependencies
	};

	module.exports = publicAPI;
	
})();
