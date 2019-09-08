/* eslint-disable strict */

(function() {

	var assert = require('chai').assert;

	describe('TODO: Auto Globals', function() {

		/* eslint-disable strict, no-unused-vars, no-implicit-globals, no-undef */
		function autoGlobal_NonStrict() {

			var teacher = 'Kyle';

			function otherClass() {
				teacher = 'Suzy';
				topic = 'React';
				console.log('Welcome!');
			}

			otherClass();
			
			console.log(teacher);
			console.log(topic);
		}

		function autoGlobal_Strict() {
			'use strict';

			var teacher = 'Kyle';

			function otherClass() {
				teacher = 'Suzy';
				topic = 'React';
				console.log('Welcome!');
			}

			otherClass();
			
			console.log(teacher);
			console.log(topic);
		}

		autoGlobal_NonStrict();
		autoGlobal_Strict();

		/* eslint-enable strict, no-unused-vars, no-implicit-globals, no-undef */

		it('TODO: Auto Globals', function() {
			assert.equal('TODO', 'TODO');
		});

	});
	
})();
