'use strict';

(function() {

	var assert = require('chai').assert;

	var nullFunction = function(){};

	describe('banana', function() {

		it('should return \'banana\' when the following expression is evaluated', function() {
			var output = ('b' + 'a' + + 'a' + 'a').toLowerCase();

			assert.equal(output, 'banana');
			
		});

		it('We are going to go step by step into how javascript evaluates this statement to banana, based on properties of NaN we learnt.', nullFunction);

		it('The last before \'a\' is treated as unary addition. It cannot work on strings. So, it tries to coerce to number, which fails and results in NaN' + '\n\t' +
			`The expression becomes 'b' + 'a' + NaN + 'a'
			`, nullFunction);

		it('Then other expression leads us with string concatenation.' + '\n\t' +
			`The expression becomes 'baNaNa'
			`, nullFunction);

		it('The .toLowerCase() function is applied then.' + '\n\t' +
			`The expression becomes 'banana'
			`, nullFunction);
		
	});
	
})();
