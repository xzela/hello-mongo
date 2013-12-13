var mongoose = require('mongoose');

var db = mongoose.connection;

var kittySchema = mongoose.Schema({
		name: String
});

var Kitten = mongoose.model('Kitten', kittySchema);

function start(request, response) {
	console.log('Request handler for "start" was called ');
	var body = '<html>'+
		'<head>'+
		'<meta http-equiv="Content-Type" content="text/html; '+
		'charset=UTF-8" />'+
		'</head>'+
		'<body>'+
		'<form action="/upload" method="post" enctype="multipart/form-data">'+
		'<input type="input" name="name" />'+
		'<input type="submit" value="Submit Input" />'+
		'</form>'+
		'</body>'+
		'</html>';
	response.writeHead(200, {'Content-Type': 'text/html'});
	response.write(body);
	response.end();
}

function list(request, response) {
	console.log('Request handler for "list" was called ');
	var cats = Kitten.find().exec(function(err, result) {
		response.writeHead(200, {'Content-Type': 'text/html'});
		response.write(JSON.stringify(result));
		response.end();
	});
}

function upload(request, response) {
	console.log('Request handler for "add" was called ');
	response.writeHead(200, {'Content-Type': 'text/html'});
	response.write("done");
	response.end();

}

exports.start = start;
exports.list = list;
exports.upload = upload;