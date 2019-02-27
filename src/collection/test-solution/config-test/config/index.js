(function() {

	const DB_NAME = 'resthub';

	var config = {
		node: {
			server: {
				port: 3000,
				serveDir: 'client'
			},
			data: {
				mongoUri: process.env.MONGODB_URI || 
					process.env.MONGO_HOST || 'mongodb://' +
					(process.env.IP || 'localhost') + ':' +
					(process.env.MONGO_PORT || '27017') + '/' +
					DB_NAME
			}
		},
		browser: true,
		tests: {
			node: {
				dir: 'server',
				pattern: ['**/*_test.js'],
			},
			browser: {
				dir: 'client',
				pattern: ['**/*_test.js', '**/*_test.jsx']
			}
		},
		bundle: {
			node: {
				entry: 'index.js',
				output: 'deploy/index.js'
			},
			browser: {
				entry: 'client/index.js' || 'client/index.jsx',
				output: 'deploy/client/bundle.js'
			}
		}

	}

	module.exports = config;
	
})();

				
