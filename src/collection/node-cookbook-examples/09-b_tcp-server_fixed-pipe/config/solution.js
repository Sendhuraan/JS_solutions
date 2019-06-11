(function() {

	var solution = {
		node: {
			// remove dir to set source dir.
			dir: 'server',
			test: false,
			bundle: false,
			server: {
				render: false
			}
		},
		browser: false,
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
