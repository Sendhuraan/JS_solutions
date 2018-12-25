(function() {

	var BitUtils = require('@sendhuraan/js-utilities').BitUtils;
	var MathUtils = require('@sendhuraan/js-utilities').MathUtils;

	function parity(x) {

		if( MathUtils.isEven( BitUtils.countSetBits(x) ) ) {
			return 0;
		}
		else {
			return 1;
		}

	}

	var x = 0b1110;

	console.log(parity(x));
	
})();
