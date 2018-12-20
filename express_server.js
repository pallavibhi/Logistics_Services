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
  trades.fetchAllTrades().
        then(response => {
           res.send(response)
        }).catch(error => {
            res.send(error);
        });
});

app.post('/addNewTrade', function (req, res) {
  let newTrade = req.body.newTrade;
  trades.addNewTrade(newTrade)
        .then(response => {
            res.send({status: 1, message: "Data Added Successfully!", data: newTrade});
        })
        .catch(error => {
            res.send({status: 0, message: 'Database Error!!'});
        });
});

app.post('/updateTrade/:tradeId', function (req, res) {
  let tradeId = parseInt(req.params.tradeId);
  let editTrade = req.body.editTrade;
  trades.updateTrade(tradeId, editTrade)
        .then(response => {
            res.send({status: 1, message: "Data Updated Successfully!", data: editTrade});
        })
        .catch(error => {
            res.send({status: 0, message: 'Database Error!!'})
        });
});

app.post('/deleteTrade/:tradeId', function (req, res) {
  let tradeId = parseInt(req.params.tradeId);
  trades.deleteTrade(tradeId)
        .then(response => {
            res.send( {status: 1, message: "Data Deleted Successfully!", data: tradeId});
        })
        .catch(error => {
            res.send( {status:0, message:'Database Error!!'} )
        });
});

const server = http.createServer(app);
server.listen(5000, function () {
  console.log('Server running on port 5000!!');
});
