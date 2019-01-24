(function() {

	var parity = require('./parity');

	var input = 0b1011101100;

	console.log(parity.parity_shiftBits(input));
	console.log(parity.parity_clearSetBits(input));
	console.log(parity.parity_lookupTable(input));
	console.log(parity.parity_xor(input));
	
})();
