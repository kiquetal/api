// index.js
// This is the main entry point of our application
 const express = require('express');
const { ApolloServer } = require('apollo-server-express');
require("dotenv").config();
const db=require("./db");
const models = require("./models");
const jwt = require('jsonwebtoken');
const depthLimit = require('graphql-depth-limit');
const { createComplexityLimitRule } = require('graphql-validation-complexity');

// Run the server on a port specified in our .env file or port 4000
const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;



const typeDefs = require("./schema");

const resolvers = require('./resolvers');
const app = express();

db.connect(DB_HOST);


// Apollo Server setup
const server = new ApolloServer({ typeDefs, resolvers,validationRules:[depthLimit(5),createComplexityLimitRule(1000)] ,context:({ req })=>
						{
							const token = req.headers.authorization;
							const user = getUser(token);
							console.log(user.id);
							return {models, user};
						}});

// Apply the Apollo GraphQL middleware and set the path to /api
server.applyMiddleware({ app, path: '/api' });

app.listen({ port }, () =>
  console.log(
    `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
  )
);

const getUser = token => {
	if (token) {
		try {
			// return the user information from the token
			return jwt.verify(token, process.env.JWT_SECRET);
		} catch (err) {
			// if there's a problem with the token, throw an error
			throw new Error('Session invalid');
		}
	}
};
