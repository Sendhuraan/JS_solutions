(function() {

	var finalhandler = require('finalhandler');
	var http = require('http');
	var serveStatic = require('serve-static');

	function run(host, port, dir) {

		var serve = serveStatic(dir, {'index': ['index.html', 'index.htm']});

		var server = http.createServer(function onRequest (req, res) {
			serve(req, res, finalhandler(req, res));
		});

		server.listen(port, host, function(error) {
			if(error) {
				console.log(error);
			}
			else {
				console.log('Server Listening on http://' + host + ':' + port);
			}
			
		});
		
	}

	module.exports = {
		run: run
	};

})();
