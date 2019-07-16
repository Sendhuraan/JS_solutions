'use strict';

(function() {

	const ws = require('ws');

	class RealTimeServer {

		constructor(contentDir) {

			var serve = serveStatic(contentDir, {'index': ['index.html', 'index.htm']});

			this._httpServer = http.createServer(function onRequest(request, response) {
				
				if(request.method === 'GET') {
					serve(request, response, finalhandler(request, response));
				}
				else {
					reject(405, response);
				}
				
			});
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

	}

	var publicAPI = {
		RealTimeServer
	};

	module.exports = publicAPI;

})();
