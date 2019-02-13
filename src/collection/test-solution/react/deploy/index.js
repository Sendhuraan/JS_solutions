(async function() {

	var path = require('path');

	const Server = require('./server/server.js');

	const PORT = 3000;
	const SERVE_DIR = 'client';
	const CONTENT_DIR = path.join(__dirname, SERVE_DIR);

	const server = new Server();

	await server.start(CONTENT_DIR, PORT);
	console.log(`Server Running at localhost:${PORT}`);

}());
