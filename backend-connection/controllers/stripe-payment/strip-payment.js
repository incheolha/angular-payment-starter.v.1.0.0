const mongoose = require('mongoose');
var keys = require('./../../stripekeyContainer/stripekeys');
var stripe = require('stripe')(keys.stripeSecretKey);

var Payment = require('../model/stripemodel')

exports.stripe_payment = (req, res, next) => {
  console.log('say hello');

  const amount = 999;
  console.log(req.body);

  stripe.customers.create({
      email: req.body.stripeEmail,
      source: req.body.stripeToken
  })
  .then(customer => stripe.charges.create ({
      amount: amount,
      description: 'Web Stripe Tester',
      currency: 'usd',
      customer: customer.id
  }))
  .then(charge => {
    console.log(charge);
    const data = new Payment({
        paymentID : charge.id,
        paymentType : charge.object,
        paymentAmount : charge.amount,
        paymentDate : Date.now(),
        paymentBalanceTransactionID : charge.balance_transaction,
        paymentCurrency : charge.currency,
        paymentCustomerID : charge.customer,
        paymentDescription : charge.description,
        paymentPaid : charge.paid,
        paymentRefunded : charge.refunded,
        refund : {
            refundDataArray : charge.refunds.data,
            refundCount : charge.refunds.total_count,
            refundURL : charge.refunds.url
        },
        paymentResult : {
            paymentResultStatus : charge.outcome.network_status,
            paymentResultReason : charge.outcome.reason,
            paymentResultRiskLevel : charge.outcome.risk_level,
            paymentResultMessage : charge.outcome.seller_message,
            paymentResultSummary : charge.outcome.type
        },
        paymentDetails : {
            paymentDetailsID :charge.source.id,
            paymentDetailsPaymentType : charge.source.object,
            paymentDetailsPaymentBillingZIP : charge.source.address_zip,
            paymentDetailsPaymentBrand : charge.source.brand,
            paymentDetailsPaymentCountry : charge.source.country,
            paymentDetailsPaymentCustomerID : charge.source.customer,
            paymentDetailsPaymentCustomerEmail : charge.source.name
        },
        paymentStatus : charge.status
    });
    data.save();
    res.render('success');
  })
  
};
