'use strict';

/*(function() {

	const readline = require('readline');

	var { getSolution } = require('./utilities');

	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});

	let numberOfTestCases;
	// let numberOfRows;
	// let numberOfColumns;
	// let inputData;

	function getNumberOfTestCases() {
		return new Promise(function(resolve, reject) {
			rl.question('', function(numberOfTestCases) {
				resolve(numberOfTestCases);
			});
		});
	}

	getNumberOfTestCases
	.then(function(result) {
		console.log(result);
	});

	// for(let testCases = 0; testCases < Number(numberOfTestCases); testCases++ ) {
	// 	process.stdin.on('data', function() {
			
	// 	})
	// }

	var input = [1,2,3];

	var primeAndCompositeGangs_default = getSolution('index', input);
	console.log(primeAndCompositeGangs_default.index());
	
})();*/

(function() {

	var fs = require('fs');
	var path = require('path');

	function add(a, b) {
		return a + b;
	}

	function main(input) {
		var lines = input.split('\n');
		var t = Number(lines[0]);
		for (var x = 1; x <= t; x++) {
			var sum = lines[x].split(' ').map(Number).reduce(add);
			process.stdout.write(sum.toString());
			process.stdout.write('\n');
		}
	}

	process.stdin.resume();
	process.stdin.setEncoding('utf-8');
	var stdin_input = '';

	var inputFile = path.join(__dirname, '/sample-input.txt');
	var readFile = fs.createReadStream(inputFile);

	readFile.on('data', function(input) {
		stdin_input += input;
	});

	readFile.on('end', function() {
		main(stdin_input);
	});
	
})();
