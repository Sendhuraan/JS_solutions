(function() {

	var BitUtils = require('@sendhuraan/js-utilities').BitUtils;

	function parity_shiftBits(x) {
		var result = 0;

		while(x) {
			result = result ^ BitUtils.getLSB(x);
			x = BitUtils.shiftBitRight(x, 1);
		}

		return result;
	}

	function parity_clearSetBits(x) {
		var result = 0;

		while(x) {
			result = result ^ 1;
			x = BitUtils.clearLowestSetBit(x);
		}

		return result;
	}

	function parity_lookupTable(x) {
		
		function buildTable() {
			var table = [];

			for(var i=0; i < 2**16 ; i++) {
				table[i] = parity_clearSetBits(i);
			}

			return table;
		}

		var precomputedParity = buildTable();

		function parity() {
			var WORD_SIZE = 8;
			var BITMASK = 0xFF;

			return ( 
			precomputedParity[x >>> (3 * WORD_SIZE)] ^
			precomputedParity[(x >>> (2 * WORD_SIZE)) & BITMASK] ^
			precomputedParity[(x >>> WORD_SIZE) & BITMASK] ^
			precomputedParity[x & BITMASK] );
		}

		return parity();
	}

	function parity_xor(x) {
		x = x ^ (x >>> 16);
		x = x ^ (x >>> 8);
		x = x ^ (x >>> 4);
		x = x ^ (x >>> 2);
		x = x ^ (x >>> 1);

		return x & 1;
	}

	var publicAPI = {
		parity_shiftBits: parity_shiftBits,
		parity_clearSetBits: parity_clearSetBits,
		parity_lookupTable: parity_lookupTable,
		parity_xor: parity_xor
	}

	module.exports = publicAPI;
	
})();
