var mongoose = require('mongoose');
var qs = require('querystring');
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
		'<form action="/upload" method="post" >'+
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
		var foo = '';
		result.forEach(function(item, index, array) {
			console.log(item);
			foo += '<div>' + item.name + '</div>';
		});
		response.write(foo);
		response.end();
	});
}

function upload(request, response) {
	console.log('Request handler for "add" was called ');
	if (request.method == 'POST') {
		var body = '';
		request.setEncoding('utf8');
		request.addListener('data', function(data) {
			body += data;
		});
		request.addListener('end', function() {
			var j = qs.parse(body);
			var bob = new Kitten({name: j.name});
			bob.save(function(err, data) {
				response.writeHead(200, {'Content-Type': 'text/html'});
				response.write("saved");
				response.end();
			});
		});
	} else {
		response.writeHead(404, {'Content-Type': 'text/html'});
		response.write("eh, 404, dude");
		response.end();

	}
}

exports.start = start;
exports.list = list;
exports.upload = upload;