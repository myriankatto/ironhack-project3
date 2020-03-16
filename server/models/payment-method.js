'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  token: {
    type: Number
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  expirationDateYear: Number,
  expirationDateMonth: Number
});

module.exports = mongoose.model('PaymentMethod', schema);
