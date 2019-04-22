(function() {

	var solution = require('./solution').solution;
	var dependencies = require('./dependencies').dependencies;
	var environments = require('./environments').environments;
	var metadata = require('./metadata').metadata;

	var publicAPI = {
		solution,
		dependencies,
		environments,
		metadata
	};

	module.exports = publicAPI;
	
})();
