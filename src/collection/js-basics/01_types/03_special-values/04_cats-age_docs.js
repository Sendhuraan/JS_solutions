'use strict';

(function() {

	var assert = require('chai').assert;
	var { outputs } = require('./04_cats-age');

	var nullFunction = function(){};

	describe('Cats Age', function() {

		it('First, myAge will convert the age to number, which is represented in octal form', nullFunction);

		it('Next, the string \'39\' is converted to number', nullFunction);

		it('Next, the string \'N/A\' is converted to number. It fails and results in NaN', nullFunction);
		
		it('Next, myAge gets subtracted from string \'my son\'s age\', which results in NaN', function() {
			assert.equal(Number.isNaN(outputs.output1), true);
		});

		it('Next, typeof NaN is a number. NaN represents invalid number. So, the typeof NaN is always a number', function() {
			assert.equal(outputs.output2, 'number');
		});

		it('Next, we compare NaN to itself. Since NaN is the only value, which is not equal to itself. we get false', function() {
			assert.equal(outputs.output3, false);
		});

		it('Next, we check for NaN using the global isNaN utility. When checked with a number, it results false', function() {
			assert.equal(outputs.output4, false);
		});

		it('Next, we check for NaN, which results in true. Good!', function() {
			assert.equal(outputs.output5, true);
		});

		it('Next, we pass a normal string to check for NaN. Unfortunately it results in true. Because, before checking it tries to convert the passed value and then checks for NaN.', function() {
			assert.equal(outputs.output6, true);
		});

		it('Fortunately, we got Number.isNaN to prevent from the mistakes above. When NaN is passed, it results true', function() {
			assert.equal(outputs.output7, true);
		});

		it('And if normal string is passed, it results false', function() {
			assert.equal(outputs.output8, false);
		});

	});
	
})();
