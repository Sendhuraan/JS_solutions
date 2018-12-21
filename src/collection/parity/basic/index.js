(function() {

	function getLSB(num) {
		return num & 1;
	}

	function shiftBit(num, shiftVal) {
		return num >>> shiftVal;
	}

	function countBits(num) {
		var count = 0;

		while(num) {

			if(getLSB(num) === 1) {
				count++;
			}

			num = shiftBit(num, 1);
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

	var num = 0b1110;

	console.log(parity(num));
	
})();
