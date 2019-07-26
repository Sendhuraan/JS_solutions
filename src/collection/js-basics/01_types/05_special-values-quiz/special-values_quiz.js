/* eslint no-redeclare: 'off' */

exports.quiz = (function() {

	var baz = 2;
	var output1 = typeof baz;

	var baz;
	var output2 = typeof baz;
	
	baz = null;
	var output3 = typeof baz;

	baz = 'baz' * 3;
	var output4 = baz;
	var output5 = typeof baz;

	baz = 1 / 0;
	var output6 = baz;
	var output7 = typeof baz;

	return {
		output1: output1,
		output2: output2,
		output3: output3,
		output4: output4,
		output5: output5,
		output6: output6,
		output7: output7
	};
	
})();

