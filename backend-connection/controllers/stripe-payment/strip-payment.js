const mongoose = require('mongoose');
var keys = require('../../routes/payment/stripe/stripekeyContainer/stripekeys');
var stripe = require('stripe')(keys.stripeSecretKey);

var Payment = require('../model/stripemodel')

exports.stripe_payment = (req, res, next) => {
  console.log('say hello');

  const amount = 999;
  console.log(req.body);

  stripe.customers.create({
      email: req.body.cardHolderEmail,
      source: req.body.tokenId
  })
  .then(customer => stripe.charges.create ({
      amount: amount,
      description: 'Web Stripe Tester',
      currency: 'usd',
      customer: customer.id
  }))
  .then(charge => {
    console.log(charge);
    savePayment(charge);
    res.status(200).json({
        message: 'stripe Payment Successful'
    });
  })


  function savePayment(charge) {


    
  }
};
