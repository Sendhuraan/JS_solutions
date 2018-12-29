(function() {

	var BitUtils = require('@sendhuraan/js-utilities').BitUtils;

	function reverseBits_swap(x, totalBits = 16) {

		//console.log(x.toString(2));

		var startBit = 1;
		var endBit = totalBits + 1;

		for(bitPositionA = startBit, bitPositionB = endBit; bitPositionA < bitPositionB; bitPositionA++, bitPositionB--) {

			x = BitUtils.swapBits(x, bitPositionA, bitPositionB);
			//console.log(x.toString(2));
		}

		return x;
		
	}

	// TODO: lookupTable function is not working. Need to fix.
	function reverseBits_lookupTable(x) {

		function buildTable() {
			var table = [];

			for(var i = 0; i < 2**16; i++) {
				table[i] = reverseBits_swap(i);
			}

			return table;
		}

		var precomputedReverse = buildTable();

		function reverseBits() {
			var WORD_SIZE = 8;
			var BITMASK = 0xFF;

			return (
				precomputedReverse[x & BITMASK] << (3 * WORD_SIZE) |
				precomputedReverse[(x >> WORD_SIZE) & BITMASK] << (2 * WORD_SIZE) |
				precomputedReverse[(x >> (2 * WORD_SIZE)) & BITMASK] << WORD_SIZE |
				precomputedReverse[(x >> (3 * WORD_SIZE)) & BITMASK]
			);
		}

		return reverseBits();
		
	}

	var publicAPI = {
		reverseBits_swap: reverseBits_swap,
		reverseBits_lookupTable: reverseBits_lookupTable
	}

	module.exports = publicAPI;
	
})();
