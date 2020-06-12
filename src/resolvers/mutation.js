const moongose = require("mongoose");

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  AuthenticationError,
  ForbiddenError
} = require('apollo-server-express');
require('dotenv').config();

const gravatar = require('../util/gravatar');
module.exports = {
  newNote: async (parent, args,{ models , user}) => {
    if(!user)
      throw new AuthenticationError("Must be signed");
    
    return await models.Note.create({
      content: args.content,
      author: moongose.Types.ObjectId(user.id)
    });
  },
  deleteNote: async (parent, {id}, {models}) => {
	try
	   {
	   await models.Note.findOneAndRemove({_id:id});
           return true
	  }
	  catch(err) {
		  return false;
	  }
  },
    updateNote: async (parent, {content, id}, { models })=>{
      return await models.Note.findOneAndUpdate({
          _id:id
      },{
          $set:{
              content
          }
      },{
          new:true
      });
    },
    signUp: async (parent, { username, password, email },{models}) =>{
    
     email = email.trim();
     const hashed = await bcrypt.hash(password,10);
     const avatar = gravatar(email)
      try
      {
        const user = await models.User.create({
          username,
          password:hashed,
          email,
          avatar
        })
        return jwt.sign({id:user._id},process.env.JWT_SECRET);
      }
      catch (e) {
        throw new Error("Error creating account");
      }
    
    },
    signIn: async (parent, { username, password, email},{ models })=>{
    
      if (email){
        email = email.trim().toLowerCase();
        
      }
      const user = await models.User.findOne({
        $or:[{email},{username}]
      })
      if (user){
        const valid = await bcrypt.compare(password,user.password);
        if  (!valid)
          throw new  AuthenticationError("Error sign in");
      }
      else
      {
        throw new AuthenticationError("User not found");
      }
      return jwt.sign({id:user._id},process.env.JWT_SECRET);
    
    }
  }

