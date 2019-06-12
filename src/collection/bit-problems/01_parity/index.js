(async function() {

	const inquirer = require('inquirer');

	var BitUtils = require('@sendhuraan/js-utilities').BitUtils;

	var interactions = [
		{
			type: 'number',
			name: 'input_number',
			message: 'Enter number to check parity : '
		}
	];

	const userInput = await inquirer.prompt(interactions);
	var input = userInput.input_number;

	console.log(`Input in binary : ${input.toString(2)}`);
	console.log(`Number of setbits : ${BitUtils.countSetBits_shiftBits(input)}`);

	var Solution_byPrototype = require('./solutions').usingPrototype.Parity;
	var parity_byPrototype = new Solution_byPrototype(input);

	console.log('Prototype');
	console.log('============');
	console.log(parity_byPrototype.using_shiftBits());
	console.log(parity_byPrototype.using_clearSetBits());
	console.log(parity_byPrototype.using_lookupTable());
	console.log(parity_byPrototype.using_xor());
	console.log(parity_byPrototype.index());

	process.stdout.write('\n');

	var parity_byObjLink = require('./solutions').usingObjLink.Parity;
	parity_byObjLink.init(input);

	console.log('ObjLink');
	console.log('============');
	console.log(parity_byObjLink.using_shiftBits());
	console.log(parity_byObjLink.using_clearSetBits());
	console.log(parity_byObjLink.using_lookupTable());
	console.log(parity_byObjLink.using_xor());
	console.log(parity_byObjLink.index());

	process.stdout.write('\n');

	var Solution_byClass = require('./solutions').usingClass.Parity;
	var parity_byClass = new Solution_byClass(input);

	console.log('Class');
	console.log('============');
	console.log(parity_byClass.using_shiftBits());
	console.log(parity_byClass.using_clearSetBits());
	console.log(parity_byClass.using_lookupTable());
	console.log(parity_byClass.using_xor());
	console.log(parity_byClass.index());
	
})();




