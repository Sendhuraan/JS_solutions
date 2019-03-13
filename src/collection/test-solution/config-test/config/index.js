(function() {

	var config = {
		browser: {
			bundle: {
				entry: 'index.jsx',
				output: 'app.js'
			},
			test: {
				pattern: ['**/*_test.jsx']
			}
		}
	};

	module.exports = config;
	
})();

				
