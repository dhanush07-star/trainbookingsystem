const express = require("express");
const app = express();
app.use(express.json());
const bodyParser = require("body-parser")
app.use(bodyParser.json())
const { Mongoose } = require('mongoose');
const mongoose = require('mongoose');

require("./Train")
var trainModel =mongoose.model("Train");


mongoose.connect(give your mongo db address, {useNewUrlParser: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open',() =>
{
    console.log("MongoDb add train database connection established successfully");
});
app.get('/',(req,res) =>
{
    res.send("This is our point");
});

app.get('/train', async(req, res) => {
    res.render('train', { title: 'Hello train master' });
});
var urlencodedParser = bodyParser.urlencoded({ extended: false });  
app.post('/train',urlencodedParser,(req,res) =>
{
     var newTrain ={
        from:req.body.from,
        to: req.body.to,
        trainName: req.body.trainName,
         trainNumber: req.body.trainNumber,
         trainTickets: req.body.trainTickets

        
    //     //trainDate : req.body.trainDate
     }

     var train = new trainModel(newTrain);

     train.save().then(() => {console.log("new train created!")}).catch((err) =>{if(err){throw err;}})
     res.send("A new Train is created!")
    // //res.send("testing our book route!")
   });
app.get("/trains",(req,res) =>
{
    trainModel.find().then((trains) =>
    {
        res.json(trains)
    }).catch(err =>
        {
            if(err){
                throw err;
            }
        })
})
app.get("/trains",(req,res) =>
{
    Train.find().then((trains) =>
    {
        res.json(trains)
    }).catch(err =>
        {
            if(err){
                throw err;
            }
        })
})
app.listen(5000,() =>
{
    console.log("up and running -- this is our trains service")
});
module.exports = app;
