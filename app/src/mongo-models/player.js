const mongo = require('mongoose');
const Schema = mongo.Schema;

const playerSchema = new Schema({
	name: String,
	college: String,
	position: String,
	jerseyNumber: Number,
	team: String,
	twitter: String
});

module.exports = mongo.model('Player', playerSchema);
