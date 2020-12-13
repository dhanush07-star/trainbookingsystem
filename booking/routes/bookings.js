const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const { Mongoose } = require('mongoose');
const mongoose = require('mongoose');
const axios = require("axios");
const { response } = require("express");

app.use(express.json());
//const APIURL = 'http://localhost:5000/trains';
mongoose.connect(give your mongo db address, {useNewUrlParser: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open',() =>
{
    console.log("MongoDb add bookings database connection established successfully");
});

app.get('/', async(req, res) => {
    res.render('index', { title: 'Train Booking' });
  });
require("./Booking")
const Booking = mongoose.model("bookings")
require("./Train")
const Train = mongoose.model("trains")


app.get('/trains',function(req,res,next){
    request(APIURL  ,
  
         function (error, response, body) {
  
             if (!error && response.statusCode == 200) {
                 res.send(body);
  
             } else {
  
                 console.log(response.statusCode + response.body);
  
                 res.send({info: NULL});
  
             }
  
         });
  });

    app.get('/booking', async(req, res) => {
    res.render('booking', { title: 'Booking info' });
    });

    var urlencodedParser = bodyParser.urlencoded({ extended: false }); 
app.post("/valid",urlencodedParser,(req,res) =>
{
    //console.log(req.body)
    var tname=req.body.tname;
    var tnumber =req.body.tnumber;
    var tfrom = req.body.from;
    var tto = req.body.to;
    var userID=req.body.bookerUserID;
    var page = req.body.age;
    var pname = req.body.name;
    var tdate = req.body.Date;
    var qtty=req.body.NoOftickets;
    var bookingdoc = Booking({"TrainNumber":tnumber,"PassengerName":pname,"age":page,"Qnt":qtty,"from": tfrom,"to": tto}); 
    Train.findOne({trainNumber:tnumber,trainName:tname},function(e,doc)
    {
        if(doc != null)
        {
            if(doc.trainTickets - qtty < 0)
            {
               res.send("No avilable tickets") 
               return;
            }
            doc.trainTickets = doc.trainTickets - qtty;
            doc.save();
            bookingdoc.save();
            res.send("booking is done!!!")
        }else{
            res.send("train not found")
            return 
        }

    });
        
});

app.get("/bookings",(req,res) =>
{
    Booking.find().then((bookings) =>
    {
        res.json(bookings)
    }).catch(err =>
        {
            if(err){
                throw err;
            }
        })
})


// app.get("/booking/:id",(req,res) =>
// {
//     Booking.findById(req.params.id).then((booking) =>
//     {
//         if(booking){
//             axios.get("http://localhost:4545/passenger/"+ booking.PassengerID).then((response) =>
//             {
//                 var bookingObject = {passengerName:response.data.name,trainTitle: ' '}
//                 axios.get("http://localhost:5000/train/"+booking.TrainID).then((response) =>
//                 {
//                     bookingObject.trainTitle = response.data.name
//                     res.json(bookingObject)
//                 })
//             })
//         }else{
//             res.send("Invalid Booking")
//         }
//     })
// })



app.listen(7777,() =>
{
    console.log("up and running! == booking service!!")
} );
module.exports = app;
