const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const path = require('path');
const IamportController = require('../../../controllers/iamportKorea-payment/iamporter-controller');

router.post('/createPayment', IamportController.create_payment);

module.exports = router;
