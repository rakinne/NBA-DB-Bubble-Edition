const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongo = require('mongoose');

const app = express();
const port = '8080';
const password = process.env.MONGO_PW;

mongo.connect(`mongodb+srv://devRizz:${password}@nbabubble.u74et.mongodb.net/nbadb?retryWrites=true&w=majority`, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

mongo.connection.once('open', () => {
	console.log('Connected to Database!');
});

app.use(
	'/graphiql',
	graphqlHTTP({
		schema: require('./graphql/schema.js'),
		graphiql: true
	})
);

app.listen(port, () => {
	console.log(`Server running successfully on port ${port}`);
});
