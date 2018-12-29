(function() {

	var parity = require('./parity');
	var BitUtils = require('@sendhuraan/js-utilities').BitUtils;

	var input = 4294967295;

	var inputSwap = 47;

	Number.prototype.toBinary = BitUtils.convertToBinary;

	// console.log(BitUtils.countSetBits_shiftBits(input));
	// console.log(BitUtils.countSetBits_clearSetBits(input));
	// console.log(BitUtils.convertToBinary(input));
	// console.log(inputSwap.toBinary());
	console.log(BitUtils.swapBits(inputSwap, 2, 5));

	// console.log(parity.parity_shiftBits(input));
	// console.log(parity.parity_clearSetBits(input));
	// console.log(parity.parity_lookupTable(input));
	// console.log(parity.parity_xor(input));
	
})();
