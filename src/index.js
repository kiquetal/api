// index.js
// This is the main entry point of our application
 const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
require("dotenv").config();
const db=require("./db");
const models = require("./models");
// Run the server on a port specified in our .env file or port 4000
const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;
let notes = [
	{ id:'1',content:'This is a note',author:'Scott'},
	{ id:'2',content:'This is another note',author:'Scott2'},
	{ id:'3',content:'oh hey look another notes',author:'Riley'}
];



const typeDefs = require("./schema");

const resolvers = require('./resolvers');

const app = express();

db.connect(DB_HOST);


// Apollo Server setup
const server = new ApolloServer({ typeDefs, resolvers,context:()=> { return {models}; }});

// Apply the Apollo GraphQL middleware and set the path to /api
server.applyMiddleware({ app, path: '/api' });

app.listen({ port }, () =>
  console.log(
    `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
  )
);
