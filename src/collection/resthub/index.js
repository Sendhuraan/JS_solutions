(async function() {

	var path = require('path');
	var mongoose = require('mongoose');

	var config = require('./config');
	const Server = require('./server/server.js');

	const CONTENT_DIR = path.join(__dirname, config.serveDir);

	mongoose.Promise = global.Promise;
	mongoose.connect(config.mongoUri, { useNewUrlParser: true });

	mongoose.connection.on('error', (err) => {
		throw new Error(err);
	});

	const server = new Server();

	await server.start(CONTENT_DIR, config.port);
	console.log(`Server Running at localhost:${config.port}`);

}());
