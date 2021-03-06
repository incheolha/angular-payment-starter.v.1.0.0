const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const path = require('path');
const StripePaymentController = require('../../../controllers/stripe-payment/stripe-controller');

router.post('/', StripePaymentController.stripe_payment);
module.exports = router;