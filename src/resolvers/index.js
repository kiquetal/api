const Query = require('./query');
const Mutation = require('./mutation');
const { GraphQLDateTime } = require('graphql-iso-date');


const gravatar = require('../util/gravatar');
module.exports = {
  Query,
  Mutation,
  DateTime: GraphQLDateTime
};
