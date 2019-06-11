/* eslint-disable no-bitwise */

(function() {

	var BitUtils = require('@sendhuraan/js-utilities').BitUtils;

	function Parity() {

		this.buildTable = function() {
			var table = [];

			for(var i=0; i < 2**16 ; i++) {
				table[i] = this.using_clearSetBits(i);
			}

			return table;
		};

	}

	Parity.prototype.using_shiftBits = function(x) {
		var result = 0;

		while(x) {
			result = result ^ BitUtils.getLSB(x);
			x = BitUtils.shiftBitRight(x, 1);
		}

		return result;
	};

	Parity.prototype.using_clearSetBits = function(x) {
		var result = 0;

		while(x) {
			result = result ^ 1;
			x = BitUtils.clearLowestSetBit(x);
		}

		return result;
	};

	Parity.prototype.using_lookupTable = function(x) {
		var precomputedParity = this.buildTable();

		var WORD_SIZE = 8;
		var BITMASK = 0xFF;

		return ( 
			precomputedParity[x >>> (3 * WORD_SIZE)] ^
			precomputedParity[(x >>> (2 * WORD_SIZE)) & BITMASK] ^
			precomputedParity[(x >>> WORD_SIZE) & BITMASK] ^
			precomputedParity[x & BITMASK]
		);

	};

	Parity.prototype.using_xor = function(x) {
		x = x ^ (x >>> 16);
		x = x ^ (x >>> 8);
		x = x ^ (x >>> 4);
		x = x ^ (x >>> 2);
		x = x ^ (x >>> 1);

		return x & 1;
	};

	Parity.prototype.index = Parity.prototype.using_xor;

	var publicAPI = {
		Parity
	};

	module.exports = publicAPI;
	
})();
