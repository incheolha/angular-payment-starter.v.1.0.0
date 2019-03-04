const express = require('express');
const mongoose = require('mongoose');
const paypal = require('paypal-rest-sdk');
const querystring = require('querystring');
const util = require('util');
const crypto = require('crypto-js');
totalAmount = 0;


exports.create_payment = ( req, res, next) => {

  console.log('I  am port payment에 접근하였습니다.... ');
  console.log(req.body);
  console.log(req.body.apply_num);                            // 카드승인번호
  console.log(req.body.paymentAgency);                        // iam port
  console.log(req.body.buyer_addr);                           // 주소
  console.log(req.body.buyer_email);                          // 이메일
  console.log(req.body.buyer_name);                           // 고객 이름
  console.log(req.body.buyer_postcode);
  console.log(req.body.buyer_tel);
  console.log(req.body.card_name);                            // 카드 이름
  console.log(req.body.currency);
  console.log(req.body.imp_uid);                              // 가맹점 아이디
  console.log(req.body.merchant_uid);                         // 상점 거래ID
  console.log(req.body.name);                                 // 결제 설명
  console.log(req.body.paid_amount);                          // 결제 금액
  console.log(req.body.paid_at);                              // 결제 장소
  console.log(req.body.pay_method);                           // 결제 방법
  console.log(req.body.pg_provider);                          // 제공업체
  console.log(req.body.pg_type);                              // 제공 종류
  console.log(req.body.status);                               // 결제 형태 (paid / cancel )
  console.log(req.body.success);                              // 결제 성공여부
  console.log(req.body.paidDate);                             // 결제 일자

  const returnStatus = true;                                  // 결재 리턴 메세지 실험용
  if (returnStatus) {
    return res.status(200).json({
      message: 'Payment was successfully saved..',
      status: true
    });
  } else {
    return res.status(500).json({
      message: 'Payment was not currently saved..',
      status: false
    });
  }

}

