const http = require('http');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
let trades = require('../model/TradeModel');


const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.get('/fetchTrades', function (req, res) {
  trades.fetchAllTrades(function(err, result){
    if(err == 'error') {
       console.log('Unsuccessful');
    }
    else{
      res.send(result);
    }
    });  
});

app.post('/addNewTrade', function (req, res) {
  trades.addNewTrade(req.body.newTrade, function(err, result){
    if(err == 'error') {
       console.log('Unsuccessful');
    }
    else{
      console.log('addNewTrade Successfully');
      res.send("Data Added Successfully!");
    }
    });  
});

const server = http.createServer(app);
server.listen(5000, function () {
  console.log('Server running on port 5000!!');
});

