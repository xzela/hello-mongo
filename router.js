function router(handle, pathname, request, response) {
	// var args = pathname.split('/');
	// pathname = "/" + args[1];
	console.log('About to handle route request for: ' + pathname);

	if (typeof handle[pathname] === 'function') {
		return handle[pathname](request, response);
	} else {
		console.log("No request handler found for " + pathname);
		response.writeHead(404, {'Content-Type': 'text/plain'});
		response.write("404 Not Found!");
		response.end();
	}
}

exports.route = router;