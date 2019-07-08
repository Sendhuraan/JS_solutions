'use strict';

(function() {

	const DEFAULT_FOLDER_STRING = 'src/collection';
	const DEFAULT_LINT__GLOBAL = [
		'**/*.js',
		'!node_modules/**',
		'!src/collection/**'
	];

	var defaults = {
		DEFAULT_FOLDER_STRING,
		DEFAULT_LINT__GLOBAL
	};

	var publicAPI = {
		defaults
	};

	module.exports = publicAPI;
	
})();
