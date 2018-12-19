const http = require('http');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
let trades = require('./model/TradeModel');


const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.get('/fetchTrades', function (req, res) {
  trades.fetchAllTrades(function(err, result) {
    (err === 'error') ? res.send('Unsuccessful')
                      : res.send(result);
    });
});

app.post('/addNewTrade', function (req, res) {
  let newTrade = req.body.newTrade;
  trades.addNewTrade(newTrade, function(err, result) {
    (err == 'error') ? res.send({status: 0, message: 'Database Error!!'})
                     : res.send({status: 1, message: "Data Added Successfully!", data: newTrade});
    });
});

app.post('/updateTrade/:tradeId', function (req, res) {
  let tradeId = parseInt(req.params.tradeId);
  let editTrade = req.body.editTrade;
  trades.updateTrade(tradeId, editTrade, function(err, result) {
    (err == 'error') ? res.send({status: 0, message: 'Database Error!!'})
                     : res.send({status: 1, message: "Data Updated Successfully!", data: editTrade});    });
});

app.post('/deleteTrade/:tradeId', function (req, res) {
  let tradeId = parseInt(req.params.tradeId);
  trades.deleteTrade(tradeId, function(err, result) {
    (err == 'error') ? res.send( {status:0, message:'Database Error!!'} )
                     : res.send( {status: 1, message: "Data Deleted Successfully!", data: tradeId});
    });
});

const server = http.createServer(app);
server.listen(5000, function () {
  console.log('Server running on port 5000!!');
});
