'use strict';

(function() {

	var assert = require('chai').assert;

	var nullFunction = function() {};

	describe('Implicit Binding (object.method)', function() {

		var workshop = {
			teacher: 'Kyle',
			ask(question) {
				console.log(this.teacher, question);
			}
		};

		workshop.ask('What is Implicit Binding');

		it('TODO: Implicit Binding', function() {
			assert.equal('TODO', 'TODO');
		});

	});

	describe('Implicit Binding (Dynamic Sharing)', function() {

		function ask(question) {
			console.log(this.teacher, question);
		}

		var workshop1 = {
			teacher: 'Kyle',
			ask: ask
		};

		var workshop2 = {
			teacher: 'Suzy',
			ask: ask
		};

		workshop1.ask('How do I share a method');
		workshop2.ask('How do I share a method');

		it('TODO: Implicit Binding (Dynamic Sharing)', function() {
			assert.equal('TODO', 'TODO');
		});

	});

	describe('Explicit Binding (call and apply)', function() {

		function ask(question) {
			console.log(this.teacher, question);
		}

		var workshop1 = {
			teacher: 'Kyle'
		};

		var workshop2 = {
			teacher: 'Suzy'
		};

		ask.call(workshop1, 'Can I explicitly set context');
		ask.call(workshop2, 'Can I explicitly set context');
		
		it('TODO: Explicit Binding (call and apply)', nullFunction);

	});

	describe('Hard binding (bind)', function() {

		var workshop = {
			teacher: 'Kyle',
			ask(question) {
				console.log(this.teacher, question);
			}
		};

		setTimeout(workshop.ask, 10, 'Lost this?');

		//fix
		setTimeout(workshop.ask.bind(workshop), 10, 'Hard bound this?');

		it('TODO: Hard binding (bind)', nullFunction);

	});
	
})();
