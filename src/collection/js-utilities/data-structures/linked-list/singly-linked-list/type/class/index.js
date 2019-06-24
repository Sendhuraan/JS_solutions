(function() {

	var main = require('../../main').singlyLinkedList;

	class Singly {
		constructor() {
			this.head = null;
			this.tail = null;
			this.length = 0;
		}
	}

	Singly.prototype.push = main.push;
	Singly.prototype.pop = main.pop;
	Singly.prototype.shift = main.shift;
	Singly.prototype.unshift = main.unshift;
	Singly.prototype.get = main.get;
	Singly.prototype.set = main.set;
	Singly.prototype.insert = main.insert;

	var publicAPI = {
		Singly
	};

	module.exports = publicAPI;
	
})();
