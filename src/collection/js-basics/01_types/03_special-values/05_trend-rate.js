/* eslint  no-compare-neg-zero: 'off' */

'use strict';

(function() {

    var trendRate = -0;

    var output1 = trendRate === -0;

    var output2 = trendRate.toString();
    var output3 = trendRate === 0;
    var output4 = trendRate < 0;
    var output5 = trendRate > 0;

    var output6 = Object.is(trendRate, 0);
    var output7 = Object.is(trendRate, -0);

	var publicAPI = {
		outputs: {
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

