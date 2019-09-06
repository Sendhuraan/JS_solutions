(function() {

	var assert = require('chai').assert;
	var quiz = require('./special-values_quiz').quiz;

	describe('Special Values Quiz', function() {

		xit('In Javascript, there are two phases - compile & execution phase. During the compile phase, the declaration on LHS of = are compiled and references of all the variables are created in respective scopes. And then, In execution phase, RHS of = are executed and values are assigned to the variables in that scope.');

		xit('In compile phase, all the variables to LHS of = will be compiled. when baz is again declared, it would have already created reference for baz, hence it will be ignored.');
		
		it('In execution phase, output1 is assigned typeof number, output1 should be \'number\', as typeof number returns \'number\'', function() {
			assert.equal(quiz.output1, 'number');
		});

		it('Next, since that statement is ignored, output2 will be same as output1', function() {
			assert.equal(quiz.output2, 'number');
		});

		it('Next, baz is assigned null and typeof null should return object (Note: This is bug in Javascript). Hence output3 will be equal to \'object\'', function() {
			assert.equal(quiz.output3, 'object');
		});

		it('Next, baz is assigned \'baz\'*3. As (*) operator only works on numbers, it would try to convert \'baz\' to a number, which would fail and result in NaN. Hence output4 will be NaN', function() {
			assert.equal(Number.isNaN(quiz.output4), true);
		});

		it('Next then, typeof NaN would be assigned to output5, which would be \'number\'', function() {
			assert.equal(quiz.output5, 'number');
		});

		it('Next, baz is assigned (1 / 0), which results in Infinity', function() {
			assert.equal(quiz.output6, Infinity);
		});
		
		it('Next then, typeof Infinity is assigned to output7, which would be equal to \'number\'', function() {
			assert.equal(quiz.output7, 'number');
		});
	});
	
})();
