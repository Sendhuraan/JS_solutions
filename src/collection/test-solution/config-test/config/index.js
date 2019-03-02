(function() {

	// Full possible custom override
	var config = {

		node: {
			server: true,
			test: false,
			bundle: true
		},
		browser: {
			test: true,
			bundle: {
				entry: 'app.js',
				output: 'main.js'
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

	module.exports = config;
	
})();

				
