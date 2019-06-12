/* eslint-disable no-bitwise */

(function() {

	var main = require('../../main');

	var Parity = Object.create(main);

	Parity.init = function(input) {
		this.input = input;
	};

	Parity.buildTable = function() {
		var table = [];

		for(var i = 0; i < 2**16 ; i++) {
			table[i] = this.using_xor(i);
		}

		return table;
	};

	var publicAPI = {
		Parity
	};

	module.exports = publicAPI;
	
})();
