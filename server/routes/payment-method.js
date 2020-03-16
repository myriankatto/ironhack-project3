'use strict';

const express = require('express');
const { Router } = express;

const router = new Router();

//const stripe = require('stripe');
//const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);

const PaymentMethod = require('./../models/payment-method');


router.get('/list', async (req, res, next) => {
  try {
    const paymentMethods = await PaymentMethod.find({ owner: req.user._id });
    res.json({ paymentMethods });
  } catch (error) {
    next(error);
  }
});


router.post('/create', (req, res, next) => {
  const {  token, expirationDateYear, expirationDateMonth } = req.body;

  PaymentMethod.create(
    {
      token,
      owner: req.user._id,
      expirationDateYear,
      expirationDateMonth
    })
    .then(card => {
      res.json(card);
    })
    .catch(error => {
      res.json(error);
    });
});



// router.post('/create', async (req, res, next) => {
//   const { token, expirationDateYear, expirationDateMonth } = req.body;
//   try {
    
//     const paymentMethod = await PaymentMethod.create({
//       token,
//       owner: req.user._id,
//       expirationDate: {
//         year: expirationDateYear,
//         month: expirationDateMonth
//       }
//     });

//     // console.log(paymentMethod);

//     // const charge = await stripeInstance.charges.create({
//     //   amount: 5089,
//     //   currency: 'eur',
//     //   customer: paymentMethod.token
//     //   // source: 'src_18eYalAHEMiOZZp1l9ZTjSU0'
//     // });

//     // console.log(charge);
//     res.json({paymentMethod});
//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
// });

module.exports = router;
