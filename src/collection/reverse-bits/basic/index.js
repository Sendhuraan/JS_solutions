(function() {

	var reverseBits = require('./reverse-bits');

	var input = 65536;

	//console.log(input.toString(2));
	console.log(reverseBits.reverseBits_swap(input).toString(2));
	//console.log(reverseBits.reverseBits_swap(input));
	console.log(reverseBits.reverseBits_lookupTable(input).toString(2));
	
})();
