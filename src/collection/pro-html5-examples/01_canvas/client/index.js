import './styles/index.css';

(function() {

	function drawDiagonalByMove() {
		var canvas = document.getElementById('diagonalByMove');
		var context = canvas.getContext('2d');

		context.beginPath();
		context.moveTo(70, 140);
		context.lineTo(140, 70);

		context.stroke();
	}

	function drawDiagonalByTranslate() {
		var canvas = document.getElementById('diagonalByTranslation');
		var context = canvas.getContext('2d');

		context.save();

		context.translate(70, 140);

		context.beginPath();
		context.moveTo(0, 0);
		context.lineTo(70, -70);

		context.stroke();

		context.restore();
	}
	
	drawDiagonalByMove();
	drawDiagonalByTranslate();

})();
