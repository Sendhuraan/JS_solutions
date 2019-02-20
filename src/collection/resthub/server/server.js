(function() {

	const ExpressServer = require('./express-server.js');

	module.exports = class Server {

		async start(contentDir, portNumber) {
			if (!portNumber) throw new Error('port number is required');

			this._httpServer = new ExpressServer(contentDir);
			await this._httpServer.start(portNumber);

		}

	};

}());
