var server = require('./server');
var router =  require('./router');
var handler = require('./handler');

var mongoose = require('mongoose');
var uri = 'mongodb://localhost/test';

var userSchema = mongoose.Schema({
	name: {
		first: String,
		last: { type: String, trim: true},
		age: {type: Number, min: 0}
	}
});

mongoose.connect(uri, function(err, response) {
	if(err) {
		console.log('ERROR connecting to: ' + uri + ', ' + err);
	} else {
		console.log('connected to: ' + uri);
		//var pu = mongoose.model('PowerUsers', userSchema);
	}
});

var handle = {};
handle['/'] = handler.start;
handle['/list'] = handler.list;
handle['/upload'] = handler.upload;

server.start(router.route, handle);

// var mediaSchema = require('./mediaSchema');

// mongoose.connect('mongodb://localhost/test');

//console.log(mediaSchema);

// var db = mongoose.connection;

// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function callback() {
// 	console.log("opened connection");

// 	var Media = mongoose.model('Media', mediaSchema);

// });
// 	console.log("opened?");
// 	var kittySchema = mongoose.Schema({
// 		name: String,
// 		owned: Boolean
// 	});
// 	kittySchema.methods.speak = function() {
// 		var greeting = this.name ? "Meow name is " + this.name : "I don't have a name";
// 		console.log(greeting);
// 	}
// 	kittySchema.statics.findOwnedCats = function(callback) {
// 		return this.find({owned: true}, callback);
// 	}

// 	var Kitten = mongoose.model('Kitten', kittySchema);
// 	Kitten.findOwnedCats(function(err, cats) {
// 		cats.forEach(function(cat){
// 			cat.speak();
// 		});
// 	});
// 	// var bob = new Kitten({name: "Bob", owned: true});
// 	// console.log(bob.name);
// 	// bob.speak();
// 	// bob.save(function(err, bob) {
// 	// 	if (err) {
// 	// 		return console.error(err);
// 	// 	}
// 	// 	console.dir(bob);
// 	// });
// });