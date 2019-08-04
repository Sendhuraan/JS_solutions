'use strict';

(function() {

	var assert = require('chai').assert;

	describe('Simple Test Suite', function() {

		test('test for equality', function() {
			assert.equal(4,4);
		});

		test('test for equality', function() {
			expect(4).toBe(4);
		});
		
	});
	
})();
