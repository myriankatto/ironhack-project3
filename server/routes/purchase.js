'use strict';

const express = require('express');
const { Router } = express;

const router = new Router();

const stripe = require('stripe');
const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);

const Purchase = require('./../models/purchase');



router.get('/list', async (req, res, next) => {
  try {
    const purchases = await Purchase.find({ user: req.user._id }).sort({$natural:1});
    res.json({ purchases });
  } catch (error) {
    next(error);
  }
});

router.post('/create', async (req, res, next) => {
  
  try {
    const plan = 3;
    const amount = 70;
    const purchase = await Purchase.create({
      user: req.user._id,
      plan,
      price: { amount, currency: 'EUR' },
      charged: false
    });

    

    //console.log(`Purchase of ${amount} being made to customer ${paymentMethod.token}`);

    await purchase.update({ charged: true });

    console.log(purchase);

    res.json({ purchase });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
