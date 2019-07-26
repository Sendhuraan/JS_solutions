(function() {

	var assert = require('chai').assert;

	describe('Primitive Types', function() {

		it('Given a primitive type, we have a set of expected behaviors for that type. Eg: Given number 42, it has expected behaviors such as we can do math on that. Given a string \'42\', we can expect it to get its individual chars and print to console.');
		
		it(`Classified into
			undefined
			null 
			string 
			number 
			boolean 
			object 
				function (special callable object)
			symbol (ES6)
		`);

		it('As Javascript is dynamically typed language, it has type of a VALUE that the variable is currently holding');

		it('when typeof operator used on a variable, returns the value type that the variable is currently holding');

		it('typeof operator will always return a string. It will not actually return the primitive type of the variable');

		it('returns string \'undefined\' when used typeof operator on variable that is not DECLARED', function() {
			assert.equal(typeof anyVarThatIsNotDeclared, 'undefined');
		});

		it('returns string \'undefined\' when used typeof operator on variable that is not DEFINED', function() {
			var foo;

			assert.equal(typeof foo, 'undefined');
		});

		it('returns string \'number\' when used typeof operator on number', function() {
			assert.equal(typeof 42, 'number');
		});

		it('returns string \'string\' when used typeof operator on string', function() {
			assert.equal(typeof '42', 'string');
		});

		it('returns string \'boolean\' when used typeof operator on boolean', function() {
			assert.equal(typeof true, 'boolean');
		});

		it('returns string \'object\' when used typeof operator on object', function() {
			assert.equal(typeof { a: 1 }, 'object');
		});

		it('returns string \'function\' when used typeof operator on function', function() {
			assert.equal(typeof function(){}, 'function');
		});

		it('returns string \'object\' when used typeof operator on null, while we may expect that it should return \'null\'. This is a bug in javascript', function() {
			assert.equal(typeof null, 'object');
		});
		
	});


	describe('Primitive Types - Examples', function() {

		it('should return \'undefined\' when the variable is not yet declared or declared, but currently has no value', function() {
			var a;

			assert.equal(typeof a, 'undefined');
			
		});

		it('should return \'string\', when typeof operation is assigned to a variable, because typeof always return string.', function() {
			var output = typeof anyVarThatIsNotDeclaredOrNotDeclared;

			assert.equal(typeof output, 'string');
		});

		it('should return \'string\' if typeof operator is used on another typeof operation.', function() {
			assert.equal(typeof typeof 2, 'string');
		});
		
	});
	
})();