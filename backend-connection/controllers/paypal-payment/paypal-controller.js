const express = require('express');
const mongoose = require('mongoose');
const paypal = require('paypal-rest-sdk');

totalAmount = 0;
exports.create_payment = ( req, res, next) => {
    console.log('this is the paypal back server');

          totalAmount = req.body.amount;

          paypal.configure({
            'mode': 'sandbox',                   //sandbox or live
            'client_id': 'AaGg81uWtXapD7Atz4uLGqpRZuQfw7dMlfco43fPxYAQrwVbVsHojatlBgZS2OagQ_d4wPULWcBI5U5U',
            'client_secret': 'EAI7LII7_hqFDIT_S4j6l30ChhSil7_zLaL68-Obpov4Srq-8Rb1Jt4CRwsOcFmTr1EPM_06DdEU8__z'
          });

    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:3000/paypal/executePayment",
            "cancel_url": "http://localhost:3000/paypal/cancelPayment"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "Toefl Exam",
                    "sku": "exam simulator",
                    "price": totalAmount,                        // angular 서버로 부터온 총금액
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": totalAmount              // angular 서버로 부터온 총금액
            },
            "description": "This is the toefl payment description."
        }]
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            console.log("Create Payment Response");
            console.log(payment);
            for(let pay of payment.links) {
              if(pay.rel === 'approval_url') {
                 return res.json({
                  url: pay.href
                });
              }
            }
        }
    });
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

