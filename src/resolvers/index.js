const Query = require('./query');
const Mutation = require('./mutation');
const Note = require("./note");
const User = require("./user");
const { GraphQLDateTime } = require('graphql-iso-date');


const gravatar = require('../util/gravatar');
module.exports = {
  Query,
  Mutation,
  Note,
  User,
  DateTime: GraphQLDateTime
};
