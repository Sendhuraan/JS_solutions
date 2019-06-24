(function() {

	const { performance } = require('perf_hooks');
	const inquirer = require('inquirer');

	var SinglyLinkedList = require('@sendhuraan/js-utilities').DataStructures.LinkedList.Singly.usingFunction.Singly;
	var inputList = new SinglyLinkedList();

	inputList.push(10);
	inputList.push(30);
	inputList.push(50);
	inputList.push(70);
	inputList.push(90);


	var reverseList = require('./solution').index.ReverseLinkedList;
	reverseList.init(inputList);

	var t0 = performance.now();

	console.log('Default (ObjLink)');
	console.log('============');
	console.log(`Default (using loop) : ${JSON.stringify(reverseList.index(), null, 4)}`);
	//console.log(`Using reverse connection : ${JSON.stringify(reverseList.using_reverseLinks(), null, 4)}`);

	var t1 = performance.now();
	console.log('Default took ' + (t1 - t0) + ' milliseconds.');

	process.stdout.write('\n');

	var Solution_byFunction = require('./solution').usingFunction.ReverseLinkedList;
	var reverseList_byFunction = new Solution_byFunction(inputList);

	var t2 = performance.now();

	console.log('Function');
	console.log('============');
	console.log(`Using loop : ${JSON.stringify(reverseList_byFunction.using_loop(), null, 4)}`);

	var t3 = performance.now();
	console.log('Function took ' + (t3 - t2) + ' milliseconds.');

	process.stdout.write('\n');

	var reverseList_byObjLink = require('./solution').usingObjLink.ReverseLinkedList;
	reverseList_byObjLink.init(inputList);

	var t4 = performance.now();

	console.log('ObjLink');
	console.log('============');
	console.log(`Using loop : ${JSON.stringify(reverseList_byObjLink.using_loop(), null, 4)}`);

	var t5 = performance.now();
	console.log('ObjLink took ' + (t5 - t4) + ' milliseconds.');

	process.stdout.write('\n');

	var Solution_byClass = require('./solution').usingClass.ReverseLinkedList;
	var reverseList_byClass = new Solution_byClass(inputList);

	var t6 = performance.now();

	console.log('Class');
	console.log('============');
	console.log(`Using loop : ${JSON.stringify(reverseList_byClass.using_loop(), null, 4)}`);

	var t7 = performance.now();
	console.log('Class took ' + (t7 - t6) + ' milliseconds.');


	var t8 = performance.now();

	console.log('Default (ObjLink)');
	console.log('============');
	console.log(`Using reverse connection : ${JSON.stringify(reverseList.using_reverseLinks(), null, 4)}`);

	var t9 = performance.now();
	console.log('Default took ' + (t9 - t8) + ' milliseconds.');
	
})();




