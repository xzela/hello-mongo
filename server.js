var http = require('http');
var url = require('url');
var port = 3000;

function start(route, handle) {
	console.log('Server has started on port: ' + port);
	function onRequest(request, response) {
		var pathname = url.parse(request.url).pathname;
		console.log("Request for " + pathname + " received");
		route(handle, pathname, request, response);
	}
	http.createServer(onRequest).listen(port);
	console.log('Server has started on port: ' + port);
}

exports.start = start;