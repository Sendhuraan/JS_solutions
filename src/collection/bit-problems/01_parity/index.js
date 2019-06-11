(function() {

	var BitUtils = require('@sendhuraan/js-utilities').BitUtils;

	var input = 8;

	console.log(input.toString(2));

	console.log(BitUtils.countSetBits_shiftBits(input));
	console.log(BitUtils.countSetBits_clearSetBits(input));

	var Solution_byPrototype = require('./solutions').usingPrototype.Parity;
	var parity_byPrototype = new Solution_byPrototype();

	console.log(parity_byPrototype.using_shiftBits(input));
	console.log(parity_byPrototype.using_clearSetBits(input));
	console.log(parity_byPrototype.using_lookupTable(input));
	console.log(parity_byPrototype.using_xor(input));
	console.log(parity_byPrototype.index(input));
	
})();




