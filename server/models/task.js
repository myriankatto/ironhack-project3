'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    frequency: {
      type: Number,
      default: 1
    },
    level: {
      type: String,
      enum: ['easy', 'medium', 'hard']
    },
    //usuário que vai realizar a tarefa
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
     
    },
    workspace: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Workspace'
      
    },
    urgency: {
      type: Boolean,
      default: false
    },
    category: {
      type: String
    },
    personal: {
      type: Boolean
    },
    //usuário que inventou a tarefa
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    description: {
      type: String,
      maxlength: 140
    },
    approved: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

module.exports = mongoose.model('Task', schema);
