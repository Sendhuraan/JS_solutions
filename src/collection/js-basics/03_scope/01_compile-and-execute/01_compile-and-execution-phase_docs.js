'use strict';

(function() {

	var assert = require('chai').assert;

	describe('TODO: Compile and Execution Phase', function() {

		/* eslint-disable no-unused-vars */
		var teacher = 'Kyle';

		function otherClass() {
			var teacher = 'Suzy';
			console.log('Welcome!');
		}

		function ask() {
			var question = 'Why?';
			console.log(question);
		}

		otherClass();
		ask();

		/* eslint-enable no-unused-vars */

		it('TODO: Compile Phase', function() {
			assert.equal('TODO', 'TODO');
		});

	});
	
})();
