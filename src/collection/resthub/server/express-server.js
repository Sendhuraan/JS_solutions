(function() {

	var http = require('http');
	var util = require('util');
	var express = require('express');
	var bodyParser = require('body-parser');

	var contactRoutes = require('./routes/contact.routes');

	module.exports = class ExpressServer {

		constructor(contentDir) {

			var app = express();

			app.use(bodyParser.urlencoded({
				extended: true
			}));

			app.use(bodyParser.json());

			app.get('/', (req, res) => res.send('Hello World with Express'));
			app.use('/user', contactRoutes);

			this._httpServer = http.createServer(app);

		}

		start(portNumber) {
			const listen = util.promisify(this._httpServer.listen.bind(this._httpServer));
			return listen(portNumber);
		}

		stop() {
			const close = util.promisify(this._httpServer.close.bind(this._httpServer));
			return close();
		}

		getNodeServer() {
			return this._httpServer;
		}

	};

})();
