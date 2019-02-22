import path from 'path';
import Server from './server/server';
import config from './config';

(async function() {

	const CONTENT_DIR = path.join(__dirname, config.serveDir);

	const server = new Server();

	await server.start(CONTENT_DIR, config.port);
	console.log(`Server Running at localhost:${config.port}`);

}());
