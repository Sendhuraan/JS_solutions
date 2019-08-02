(function() {

	var LinkedList = require('./linked-list');
	var BinarySearchTree = require('./binary-search-tree');

	var publicAPI = {
		LinkedList,
		BinarySearchTree
	};

	module.exports = publicAPI;
	
})();
