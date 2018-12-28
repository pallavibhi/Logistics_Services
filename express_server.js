const http = require('http');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
let trades = require('./model/TradeModel');
let tranports = require('./model/TransportModel');
let transfer = require('./model/TransferModel');
let qs = require('qs');

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());




/* -- Trades Services-- */
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


/* -- Transports Services-- */
app.get('/fetchTransports', function (req, res) {
    tranports.fetchAllTransports().
          then(response => {
             res.send(response)
          }).catch(error => {
              res.send(error);
          });
  });
  
  app.post('/addNewTransport', function (req, res) {
    let newTransport = req.body.newTransport;
    tranports.addNewTransport(newTransport)
          .then(response => {
              res.send({status: 1, message: "Data Added Successfully!", data: newTransport});
          })
          .catch(error => {
              res.send({status: 0, message: 'Database Error!!'});
          });
  });
  
  app.post('/updateTransport/:transportId', function (req, res) {
    let transportId = parseInt(req.params.transportId);
    let editTransport = req.body.editTransport;
    tranports.updateTransport(transportId, editTransport)
          .then(response => {
              res.send({status: 1, message: "Data Updated Successfully!", data: editTransport});
          })
          .catch(error => {
              res.send({status: 0, message: 'Database Error!!'})
          });
  });
  
  app.post('/deleteTransport/:tradeId', function (req, res) {
    let transportId = parseInt(req.params.transportId);
    tranports.deleteTransport(transportId)
          .then(response => {
              res.send( {status: 1, message: "Data Deleted Successfully!", data: tradeId});
          })
          .catch(error => {
              res.send( {status:0, message:'Database Error!!'} )
          });
  });

  app.get('/getTradesToTransports', function (req, res) {
    let tradeIds = req.query.tradeIds.map(Number);
    tranports.getTradesToTransports(tradeIds).
          then(response => {
             res.send({status: 1, message: "Data Deleted Successfully!", data: response})
          }).catch(error => {
              res.send(error);
          });
  });


  /* -- Transfers Services-- */
  app.get('/fetchAllPurchaseTrades', function (req, res) {
    transfer.fetchAllPurchaseTrades().
          then(response => {
             res.send(response)
          }).catch(error => {
              res.send(error);
          });
  });

  app.get('/fetchAllSalesTrades', function (req, res) {
    transfer.fetchAllSalesTrades().
          then(response => {
             res.send(response)
          }).catch(error => {
              res.send(error);
          });
  });

  app.get('/getAllMatchingTransports/:purchaseDate/:salesDate/:purchaseLoaction/:salesLocation', function (req, res) {
    let purchaseDate = req.params.purchaseDate;   
    let salesDate = req.params.salesDate;
    let purchaseLoaction = req.params.purchaseLoaction;
    let salesLocation = req.params.salesLocation;

    transfer.getAllMatchingTransports(purchaseDate, salesDate, purchaseLoaction, salesLocation)
            .then(response => {
             res.send(response)
            })
            .catch(error => {
              res.send(error);
          });
  });

  app.post('/updateTradeStatus/:tradeId', function (req, res) {
    let tradeId = parseInt(req.params.tradeId);
    let statusToBeUpdated = req.body.statusToBeUpdated;
    transfer.updateTradeStatus(tradeId, statusToBeUpdated)
            .then(response => {
                res.send({status: 1, message: "Data Updated Successfully!", data: statusToBeUpdated});
            })
            .catch(error => {
                console.log('error=> ', error);
                res.send({status: 0, message: 'Database Error!!'})
            });
  });

  app.post('/updateTransportsAddTransfer/:transportId', function (req, res) {
    let transportId = parseInt(req.params.transportId);    
    let loadTransfer = req.body.loadTransfer;
    let unloandTransfer = req.body.unloandTransfer;
    transfer.updateTransportsAddTransfer(transportId, loadTransfer, unloandTransfer)
            .then(response => {
                res.send({status: 1, message: "Transport Nominated Successfully!!"});
            })
            .catch(error => {
                res.send({status: 0, message: 'Database Error!!'})
            });
  });

  



const server = http.createServer(app);
server.listen(5000, function () {
  console.log('Server running on port 5000!!');
});
