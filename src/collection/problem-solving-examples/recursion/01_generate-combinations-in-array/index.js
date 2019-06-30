'use strict';

(function() {

	var inputArray = [1, 2, 3, 4, 5, 6];
	var combinationOf = 3;

	var Solution_byFunction = require('./solution').usingFunction.Combination;
	var combination_byFunction = new Solution_byFunction(inputArray, combinationOf);

	console.log(combination_byFunction.using_recursion(inputArray, combinationOf));
	
})();
