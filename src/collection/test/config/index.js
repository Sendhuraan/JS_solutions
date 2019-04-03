(function() {

	//var npmDependencies = JSON.parse(require('./dependencies.json')).dependencies;

	var config = {
		node: true,
		browser: false
	};

	var publicAPI = {
		config
		//npmDependencies
	};

	module.exports = publicAPI;
	
})();
