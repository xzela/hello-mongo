var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
	console.log("opened?");
	var kittySchema = mongoose.Schema({
		name: String,
		owned: Boolean
	});
	kittySchema.methods.speak = function() {
		var greeting = this.name ? "Meow name is " + this.name : "I don't have a name";
		console.log(greeting);
	}
	kittySchema.statics.findOwnedCats = function(callback) {
		return this.find({owned: true}, callback);
	}

	var Kitten = mongoose.model('Kitten', kittySchema);
	Kitten.findOwnedCats(function(err, cats) {
		cats.forEach(function(cat){
			cat.speak();
		});
	});
	// var bob = new Kitten({name: "Bob", owned: true});
	// console.log(bob.name);
	// bob.speak();
	// bob.save(function(err, bob) {
	// 	if (err) {
	// 		return console.error(err);
	// 	}
	// 	console.dir(bob);
	// });
});