(function() {

	const fs = require('fs');
	const path = require('path');

	const through = require('through2');

	function getFullPath(pathname) {
		return path.join(__dirname, pathname);
	}

	const inputFile = getFullPath('data/input/input.json');
	const outputFile = getFullPath('data/output/output.json');

	function addPoint() {

		return through.obj(function(chunk, encoding, callback) {
			const pointObj = JSON.parse(chunk);
			callback(null, { z: pointObj.x + pointObj.y });
		});

	}

	function toJSONString() {

		return through.obj(function(chunk, encoding, callback) {
			this.push(JSON.stringify(chunk, null, 4) + '\n');
			callback();
		});

	}

	fs.createReadStream(inputFile)
	.pipe(addPoint())
	.pipe(toJSONString())
	.pipe(fs.createWriteStream(outputFile));
		
})();
