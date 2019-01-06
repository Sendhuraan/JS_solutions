const Readable = require('stream').Readable;
const fs = require('fs');

const readStream = new Readable();

const writeStream = fs.createWriteStream('./counter.txt', { flags: 'w', mode: 0666 });

let count = 0;

readStream._read = function() {
	count++;

	if(count > 10) {
		return readStream.push(null);
	}

	setTimeout(function() {
		readStream.push(count + '\n');
	}, 500);

};

readStream.pipe(writeStream);



