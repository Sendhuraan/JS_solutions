(function() {

	function swap(inputArray, index_A, index_B) {
		var temp = inputArray[index_A];
		inputArray[index_A] = inputArray[index_B];
		inputArray[index_B] = temp;
	}

	function init(inputArray, pivotIndex) {

		var outputArray = [...inputArray];

		var pivot = outputArray[pivotIndex];

		var smaller = 0;
		var equal = 0;
		var larger = outputArray.length - 1;

		while (equal <= larger) {
			if(outputArray[equal] < pivot) {
				swap(outputArray, smaller++, equal++);
			}
			else if(outputArray[equal] === pivot) {
				equal++;
			}
			else {
				swap(outputArray, equal, larger--);
			}
		}

		return outputArray;
	}


	var publicAPI = {
		init: init
	};

	module.exports = publicAPI;
	
})();
