'use strict';

(function() {

	var assert = require('chai').assert;
	var { outputs } = require('./05_trend-rate');

	var nullFunction = function(){};

	describe('Trend Rate', function() {

		it('First, trendRate is assigned negative zero (-0)', nullFunction);

		it('Next, if we check with === -> it results true. Good', function() {
			assert.equal(outputs.output1, true);
		});

		it('Next, when we try to convert to string, we get zero (weird!)', function() {
			assert.equal(outputs.output2, 0);
		});
		
		it('Next, when we check with (0), it results in true (Not Good!)', function() {
			assert.equal(outputs.output3, true);
		});

		it('Next, again when checked < or >, it results in false. (-0) is neither greater than (0) or less than (0). Not Good again!', function() {
			assert.equal(outputs.output4, false);
			assert.equal(outputs.output5, false);
		});

		it('Fortunately, we got Object.is to check for correct (-0) value. when passed (0) it returns false', function() {
			assert.equal(outputs.output6, false);
		});

		it('Next, if we pass (-0), we get true. Good!', function() {
			assert.equal(outputs.output7, true);
		});

	});
	
})();
