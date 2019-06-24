(function() {

	var main = require('../../main').solution;

	class ReverseLinkedList {
		constructor(input) {
			this.input = input;
		}
	}

	ReverseLinkedList.prototype.using_loop = main.using_loop;
	ReverseLinkedList.prototype.using_reverseLinks = main.using_reverseLinks;
	ReverseLinkedList.prototype.using_recursion = main.using_recursion;
	ReverseLinkedList.prototype.index = main.index;

	var publicAPI = {
		ReverseLinkedList
	};

	module.exports = publicAPI;
	
})();
