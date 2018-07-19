const mongoose = require('mongoose');

// 스피킹 스키마 정의
var paymentSchema = mongoose.Schema({
    paymentID: {type: String, trim:true, 'default':''},  //Payment Id
    paymentType :{type: String, trim:true, 'default':''},             //ex) payment, refund, etc
    paymentAmount :{type: Number},                                    //payment Amount
    paymentDate : {type: Date, 'default': Date.now},                  //payment Date
    paymentBalanceTransactionID : {type:String, trim:true, 'default':''},    //paymentTranscationId
    paymentCurrency : {type:String, trim:true, 'default':''},         //paymentCurrency ex)USD, JPY,
    paymentCustomerID : {type:String, trim:true, 'default':''},       //paymentCustomerID
    paymentDescription : {type:String, trim:true, 'default':''},      //paymentDescription
    paymentPaid : {type:Boolean},                                     //결제 여부  true or false
    paymentRefunded :{type:Boolean},                                  //환불 여부  true or false
    refundAmount : {type: Number},                                    //refund Amount
    refund :[{                                                        //refund Detail information
        refundDataArray : {type:Array},                               //refund data Array
        refundCount : {type: Number},                                 //refund countCheck
        refundURL : {type: String, trim : true}                       //refund URL address
    }],
    paymentResult : [{                                                              //은행으로부터 온 정보 
        paymentResultStatus : {type: String, trim: true, 'default': ''},            //은행으로부터 승인/미승인 여부
        paymentResultReason : {type: String, trim: true, 'default': ''},            //미승인시 미승인에 관한 이유
        paymentResultRiskLevel : {type: String, trim : true, 'default': ''},        //정보의 risk level 정보
        paymentResultMessage : {type:String, trim: true, 'default':''},             //판매자가 구매자에게 보내는 메세지.
        paymentResultSummary : {type:String, trim: true, 'default': ''}             //은행으로부터 온 결과 요약.
    }],
    paymentDetails : [{                                                             //PaymentDetails
        paymentDetailsID: { type: String, trim:true },                              //paymentDetailsID                   
        paymentDetailsPaymentType : {type: String, trim:true, 'default':''},        //paymentDetailType ex)card, check,
        paymentDetailsPaymentBillingZIP : {type: Number},                           //paymentBillingZipcode 
        paymentDetailsPaymentBrand : {type: String, trim:true, 'default': ''},      //paymentBrand ex) Visa, MasterCard..
        paymentDetailsPaymentCountry : {type: String, trim:true, 'default':''},     //paymentCountry ex)US, JPN, ....
        paymentDetailsPaymentCustomerID : {type: String, trim:true, 'default':''},  //paymentCustomerID
        paymentDetailsPaymentCustomerEmail :{type: String, trim: true, 'default':''}//paymentCustomerEmail
    }],
    paymentStatus : {type: String, trim: true, 'default':''}                        //paymentStatus ex) 'succeeded'
})

 

module.exports = mongoose.model('Payment', paymentSchema);
