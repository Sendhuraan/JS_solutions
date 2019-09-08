'use strict';

(function() {

	var assert = require('chai').assert;

	describe('TODO: Nested Scopes', function() {

		/* eslint-disable no-undef */
		function otherClass() {
			var teacher = 'Suzy';

			function ask(question) {
				console.log(teacher, question);
			}

			ask('Why?');
		}

		otherClass();

		try {
			ask('????');
		}
		catch(err) {
			if(err.name === 'ReferenceError') {
				console.error('ask -> ReferenceError');
			}
		}
		

		/* eslint-enable no-undef */

		it('TODO: Nested Scopes', function() {
			assert.equal('TODO', 'TODO');
		});

	});
	
})();
