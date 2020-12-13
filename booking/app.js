//require("dotenv").config();
var express = require('express');
var mongoose = require('mongoose');
var path = require('path');


//var indexRouter = require('./routes/index/index');
var bookingRouter = require('./routes/bookings');
//var tusersRouter =  require('./routes/trains/tusers');
//var passengerRouter = require('./routes/passengers/passengers')

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');



app.use(express.json());
//app.use('/', indexRouter);
app.use('/booking', bookingRouter);
//app.use('/tusers', tusersRouter);
//app.use('/passenger',passengerRouter)

app.listen(9000,function(){
    console.log("Servier connected....")
})
module.exports = app;