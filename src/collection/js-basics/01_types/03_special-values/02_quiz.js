/* eslint no-redeclare: 'off' */

'use strict';

(function() {

	var baz = 2;
	var output1 = typeof baz;

	var baz;
	var output2 = typeof baz;
	
	baz = null;
	var output3 = typeof baz;

	baz = 'baz' * 3;
	var output4 = baz;
	var output5 = typeof baz;

	baz = 1 / 0;
	var output6 = baz;
	var output7 = typeof baz;

	var publicAPI = {
		quiz: {
			output1,
			output2,
			output3,
			output4,
			output5,
			output6,
			output7
		}
	};

	module.exports = publicAPI;
	
})();

