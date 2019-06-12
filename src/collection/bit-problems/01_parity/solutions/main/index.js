/* eslint-disable no-bitwise */

(function() {

	var BitUtils = require('@sendhuraan/js-utilities').BitUtils;

	function buildTable() {
		var table = [];

		for(var i = 0; i < 2**16 ; i++) {
			table[i] = this.using_xor(i);
		}

		return table;
	}

	function using_shiftBits(x = this.input) {
		var result = 0;
		
		while(x) {
			result = result ^ BitUtils.getLSB(x);
			x = BitUtils.shiftBitRight(x, 1);
		}

		return result;
	}

	function using_clearSetBits(x = this.input) {
		var result = 0;
		
		while(x) {
			result = result ^ 1;
			x = BitUtils.clearLowestSetBit(x);
		}

		return result;
	}

	function using_lookupTable(x = this.input) {
		var precomputedParity = this.buildTable();

		var WORD_SIZE = 8;
		var BITMASK = 0xFF;

		return ( 
			precomputedParity[x >>> (3 * WORD_SIZE)] ^
			precomputedParity[(x >>> (2 * WORD_SIZE)) & BITMASK] ^
			precomputedParity[(x >>> WORD_SIZE) & BITMASK] ^
			precomputedParity[x & BITMASK]
		);
	}

	function using_xor(x = this.input) {
		x = x ^ (x >>> 16);
		x = x ^ (x >>> 8);
		x = x ^ (x >>> 4);
		x = x ^ (x >>> 2);
		x = x ^ (x >>> 1);

		return x & 1;
	}

	const index = using_xor;

	var publicAPI = {
		buildTable,
		using_shiftBits,
		using_clearSetBits,
		using_lookupTable,
		using_xor,
		index
	};

	module.exports = publicAPI;
	
})();
