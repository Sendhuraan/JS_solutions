(function() {

	var DataStructures = require('@sendhuraan/js-utilities').DataStructures;

	var list = new DataStructures.LinkedList.Singly();
	list.push(80);
	list.push(85);
	list.push(90);
	console.log(list);
	console.log(list.get(2));
	console.log(list.get(-1));
	console.log(list.get(9));
	console.log(list.get(4));
	console.log(list.get(0));
	list.set(0, 800);
	console.log(list);
	list.set(1, 850);
	console.log(list);

})();
