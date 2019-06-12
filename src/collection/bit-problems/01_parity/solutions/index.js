(function() {

	var usingPrototype = require('./type/prototype');
	var usingObjLink = require('./type/obj-link');
	var usingClass = require('./type/class');

	var publicAPI = {
		usingPrototype,
		usingObjLink,
		usingClass
	};

	module.exports = publicAPI;
	
})();
