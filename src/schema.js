const {gql} = require('apollo-server-express');

module.exports = gql`
  scalar DateTime
  type Note {
    id: ID!
    content: String!
    author: User!
    createdAt: DateTime!,
    updatedAt: DateTime!,
    favoriteCount: Int!,
    favoritedBy: [User!]
  }

  

  type User {
  id: ID!,
  username: String!,
  password: String!,
  avatar: String,
  email: String,
  notes:[Note!]
  favorites:[Note!]
  }
  type Query {
    notes: [Note!]!
    note(id: ID!): Note!
    user(username:String!): User
    users:[User!]!
    me:User!
  }

  type Mutation {
    newNote(content: String!): Note!
    updateNote(id:ID!,content:String!): Note!
    deleteNote(id:ID!):Boolean!
    signUp(username:String!, email:String!,password:String!):String!,
    signIn(username:String!,email:String!,password:String!):String!
    toggleFavorite(noteId: ID!): Note!
  }
`;
