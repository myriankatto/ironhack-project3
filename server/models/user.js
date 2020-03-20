'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  passwordHash: {
    type: String
  },
  picture: {
    type: String,
    default: 'https://res.cloudinary.com/dq4jevckc/image/upload/v1584440915/avatar_kletok.svg'
  },
  operator: {
    type: Boolean,
    default: false
  },
  scoreUser: [
         {
            score: {
              type: Number,
              default: 0
            },
            workspace: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'Workspace' 
            }
          }
  ],
  workspace: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Workspace'
    }
  ],
  workspaceApproved: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Workspace'
    }
  ]
});

module.exports = mongoose.model('User', schema);
