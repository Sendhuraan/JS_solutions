(function() {

	var solution = require('./solution').solution;
	var dependencies = require('./dependencies').dependencies;
	var environments = require('./environments').environments;

	var config = {
		node: {
			// remove dir to set source dir.
			dir: 'server',
			test: false,
			bundle: false,
			server: {
				render: false,
				serveDir: 'client'
			},
			outputDir: 'deploy'
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
		solution,
		dependencies,
		environments
	};

	module.exports = publicAPI;
	
})();
