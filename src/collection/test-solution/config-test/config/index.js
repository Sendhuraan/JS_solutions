(function() {

	var config = {
		node: {
			test: true
		},
		browser: {
			dir: 'client',
			test: {
				pattern: ['**/*_test.jsx']
			},
			bundle: {
				entry: 'index.jsx'
			}
		}
	};

	module.exports = config;
	
})();

				
