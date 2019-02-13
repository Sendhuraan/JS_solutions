// (function() {

// 	var finalhandler = require('finalhandler');
// 	var http = require('http');
// 	var serveStatic = require('serve-static');
// 	var util = require('util');


// 	function run(host, port, dir) {

// 		var serve = serveStatic(dir, {'index': ['index.html', 'index.htm']});

// 		var server = http.createServer(function onRequest (req, res) {
// 			serve(req, res, finalhandler(req, res));
// 		});

// 		server.listen(port, host, function(error) {

// 			if(error) {
// 				console.log(error);
// 			}
// 			else {
// 				console.log('Server Listening on http://' + host + ':' + port);
// 			}
			
// 		});
		
// 	}

// 	module.exports = {
// 		run: run
// 	};

// })();


(function() {

	var finalhandler = require('finalhandler');
	var http = require('http');
	var serveStatic = require('serve-static');
	var util = require('util');

	module.exports = class HttpServer {

		constructor(contentDir) {
			var serve = serveStatic(contentDir, {'index': ['index.html', 'index.htm']});

			this._httpServer = http.createServer(function onRequest(req, res) {
				serve(req, res, finalhandler(req, res));
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

	};

})();
