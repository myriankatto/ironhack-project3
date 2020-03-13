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
    default:
      'https://img.favpng.com/2/12/12/computer-icons-portable-network-graphics-user-profile-avatar-png-favpng-L1ihcbxsHbnBKBvjjfBMFGbb7.jpg'
  },
  operator: {
    type: Boolean,
    default: false
  },
  score: {
    type: Number,
    default: 0
  },
  workspace: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Workspace'
    }
  ]
});

module.exports = mongoose.model('User', schema);
