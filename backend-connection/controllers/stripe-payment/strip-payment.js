const mongoose = require('mongoose');
var keys = require('../../routes/payment/stripe/stripekeyContainer/stripekeys');
var stripe = require('stripe')(keys.stripeSecretKey);

var Payment = require('../model/paymentModel')

exports.stripe_payment = (req, res, next) => {
  console.log('say hello');

  console.log(req.body);

  stripe.customers.create({
      email: req.body.cardHolderEmail,                
      source: req.body.tokenId
  })
  .then(customer => stripe.charges.create ({
      amount: req.body.amount,
      description: 'Web Stripe Tester',
      currency: 'usd',
      customer: customer.id
  }))
  .then(charge => {
    console.log(charge);
    savePayment(charge);
  })


  function savePayment(charge) {

            const convertAmount = (charge.amount / 100);
            Payment.findOne({ paymentID: charge.id })
            .exec()
            .then( paymentDoc => {
                if (paymentDoc) {
                    return res.status(409).json({
                        message: 'Payment is already exists'
                    });
                } else {
      
                        const payment = new Payment({
                            paymentID : charge.id,
                            paymentAgency : 'stripe',
                            paymentType : charge.object,
                            paymentAmount : convertAmount,
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
            

                    console.log(payment);
                    payment
                        .save()
                        .then(result => {
                            res.status(200).json({
                                message: 'Payment is saved successfully',
                            });
                        })
                        .catch(err => {
                            console.error(err);
                            res.status(500).json({
                            title: 'Payment Error',
                            message: 'Payment can not be registered'
                            });
                        });
                }
            });
  }

};
