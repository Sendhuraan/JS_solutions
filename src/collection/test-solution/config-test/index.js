(async function() {

	var fs = require('fs');
	var path = require('path');
	var util = require('util');

	const readFile = util.promisify(fs.readFile);
	const Server = require('./server/server.js');

	try {
		const configEnv = '/env.json';
		const configPath = path.join(__dirname, configEnv);

		const serverConfig = JSON.parse(await readFile(configPath));

		const PORT = serverConfig.port;
		const SERVE_DIR = serverConfig.serveDir;
		const CONTENT_DIR = path.join(__dirname, SERVE_DIR);

		const server = new Server();

		await server.start(CONTENT_DIR, PORT);
		console.log(`Server Running at localhost:${PORT}`);

	}
	catch(err) {
		if(err) {
			console.log(err);
		}
	}	

}());
