(function() {

	function clearLowerSetBit(x) {
		return x & (x - 1);
	}

	function extractLowestSetBit(x) {
		return x & ~(x - 1);
	}

	function getLSB(num) {
		return num & 1;
	}

	function shiftBit(num, shiftVal) {
		return num >>> shiftVal;
	}

	function countBits(num) {
		var count = 0;

		while(num) {

			// if(getLSB(num) === 1) {
			// 	count++;
			// }

			// num = shiftBit(num, 1);

			num = num & (num - 1);
			count++;
		}

		return count;
	}

	function parity(num) {

		if(countBits(num) % 2 === 0) {
			return 0;
		}
		else {
			return 1;
		}

	}

	var num = 0b1100;

	console.log(extractLowestSetBit(num).toString(2));
	
})();
