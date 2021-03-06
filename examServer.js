var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// connecting mongoose
var mongoose = require('mongoose');
// mongoose.connect("mongodb://localhost:27017/examSimulator");
// mongoose.connect("mongodb://192.168.0.86:27017/examSimulator");

var stripeRoutes = require('./backend-connection/routes/payment/stripe/stripe-route');
var paypalRoutes = require('./backend-connection/routes/payment/paypal/paypal-route');
var iamportRoutes = require('./backend-connection/routes/payment/iamportKorea/iamport-route');


var app = express();

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'hbs');

//toefl uploads image and audio file
app.use('/uploads',
        express.static('backend-connection/routes/toefl/registerExam/uploads'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//angular 5.0 CLI와 통합하여 모든 URL(/)을 angular로 연결하기위한 express.static setting
console.log("this is a check point");

app.use(express.static(path.join(__dirname, 'dist')));

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
  next();
});

app.use('/stripepayment', stripeRoutes);
app.use('/paypal', paypalRoutes);
app.use('/iamport', iamportRoutes);
// all error are automatically send index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
})

module.exports = app;
