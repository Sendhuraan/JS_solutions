(function() {

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
					host: 'localhost',
					port: 3000
				},
				stage: false,
				production: false
			},
			db: false,
			deploy: 'deploy'
		},
		browser: {
			// remove dir to set source dir.
			dir: 'client',
			test: false,
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
		}
	};

	var publicAPI = {
		config
	};

	module.exports = publicAPI;
	
})();
