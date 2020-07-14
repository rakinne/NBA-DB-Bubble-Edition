const mongo = require('mongoose');
const Schema = mongo.Schema;

const teamSchema = new Schema({
	name: String,
	city: String,
	state: String,
	twitter: String,
	arena: String,
	wins: Number,
	losses: Number,
	players: Array
});

module.exports = mongo.model('Team', teamSchema);
