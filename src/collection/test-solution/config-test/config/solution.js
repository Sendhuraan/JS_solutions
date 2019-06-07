(function() {

	var solution = {
		node: {
			// remove dir to set source dir.
			dir: 'server',
			test: {
				pattern: ['**/*_test.js']
			},
			bundle: {
				entry: 'index.js',
				output: {
					file: 'index.js'
				}
			},
			server: {
				render: false
			}
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
		},
		dirs: {
			outputDir: 'output',
			developmentDir: 'workstation',
			deployDir: 'deploy'
		}
	};

	var publicAPI = {
		solution
	};

	module.exports = publicAPI;
	
})();
