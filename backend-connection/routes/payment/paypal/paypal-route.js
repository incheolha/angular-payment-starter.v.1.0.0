const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const path = require('path');
const PayPalController = require('../../../controllers/paypal-payment/paypal-controller');

router.get('/executePayment', PayPalController.execute_payment);
router.get('/cancelPayment', PayPalController.cancel_payment);
router.post('/createPayment', PayPalController.create_payment);

module.exports = router;
