const express = require('express');
const mongoose = require('mongoose');
const paypal = require('paypal-rest-sdk');

totalAmount = 0;
exports.create_payment = ( req, res, next) => {
    console.log('this is the paypal back server');

}


exports.execute_payment = ( req, res, next) => {

  console.log('payment Id is' + req.query.paymentId);
  console.log('payer Id is' + req.query.PayerID);
  console.log('checkout Token is' + req.query.token);

    var execute_payment_json = {
      "payer_id": req.query.PayerID,
      "transactions": [{
          "amount": {
              "currency": "USD",
              "total": totalAmount
          }
      }]
    };

    var paymentId = req.query.paymentId;

    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            console.log(error.response);
            throw error;
        } else {
            console.log("Get Payment Response");
            console.log(JSON.stringify(payment));
            return res.status(200).json({
              message: 'payment successful'
            //   payment: payment
            })
        }
    });

}

exports.cancel_payment = ( req, res, next ) => {
  res.status(200).json({
    message: 'payment Cancelled'
  });
}

