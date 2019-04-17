(function() {

	var solution = {
		node: {
			// remove dir to set source dir.
			dir: 'server',
			test: false,
			bundle: false,
			server: {
				render: false
			},
			db: {
				name: 'mongodb-cookbook-examples_01_inserting-records_users'
			},
			outputDir: 'output'
		},
		browser: {
			// remove dir to set source dir.
			dir: 'client',
			test: false,
			bundle: {
				entry: 'index.jsx',
				output: {
					dir: 'dist',
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
		solution
	};

	module.exports = publicAPI;
	
})();
