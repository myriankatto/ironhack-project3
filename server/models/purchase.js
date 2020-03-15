'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  plan: [
    {
      type: Number,
      enum: [1 , 2 , 3 ]
    }
  ],
  charged: {
    type: Boolean
  },
  price: {
    amount: {
      type: Number,
      min: 0
    },
    currency: {
      type: String,
      enum: ['EUR', 'USD', 'RBL']
    }
  }
});

module.exports = mongoose.model('Purchase', schema);
