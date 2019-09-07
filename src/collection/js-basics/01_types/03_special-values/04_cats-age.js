/* eslint no-unused-vars: 'off', no-self-compare: 'off' */

'use strict';

(function() {

	var myAge = Number('0o46');
	var myNextAge = Number('39');
	var myCatsAge = Number('N/A');

	var output1 = myAge - 'my son\'s age';
	var output2 = typeof (myAge - 'my son\'s age');

	var output3 = myCatsAge === myCatsAge;

	var output4 = isNaN(myAge);
	var output5 = isNaN(myCatsAge);
	var output6 = isNaN('my son\'s age');

	var output7 = Number.isNaN(myCatsAge);
	var output8 = Number.isNaN('my son\'s age');

	var publicAPI = {
		outputs: {
			output1,
			output2,
			output3,
			output4,
			output5,
			output6,
			output7,
			output8
		}
	};

	module.exports = publicAPI;
	
})();

