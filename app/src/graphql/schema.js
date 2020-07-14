const { graphql, buildSchema } = require('graphql');

// Constructing the schema
var schema = buildSchema(`
    type Query {
        hello: String
    }`);

// This root provides a resolver function for "Hello" endpoint
var root = {
	hello: () => {
		return 'Hello world!';
	}
};

// Run the GQL query ' { hello } ' and print out the response
graphql(schema, '{ hello }', root).then((response) => {
	console.log(response);
});
