'use strict';

(function() {

	var assert = require('chai').assert;

	describe('TODO: Function Expression', function() {

		/* eslint-disable no-undef */
		function teacher() {
			return 'Kyle';
		}

		var myTeacher = function anotherTeacher() {
			console.log(anotherTeacher);
		};

		console.log(teacher);
		console.log(myTeacher);

		try {
			console.log(anotherTeacher);
		}
		catch(err) {
			if(err.name === 'ReferenceError') {
				console.log('anotherTeacher -> ReferenceError');
			}
		}
		
		/* eslint-enable no-undef */

		it('TODO: Function Expression', function() {
			assert.equal('TODO', 'TODO');
		});

	});
	
})();
