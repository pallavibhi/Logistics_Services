var db = require('./db');

const URL = 'mongodb://root:root_123@ds157964.mlab.com:57964/poc_logistics_db';

module.exports = {
    fetchAllPurchaseTrades: function () {
        return new Promise((resolve, reject) => {
            db.connect(URL, function(err) {
                if (err) {
                console.log('Unable to connect to Mongo.')
                } else {
                const collection = db.get().collection('trades');
                collection.find({side: 'BUY'}).toArray()
                .then(response =>  {
                    resolve(response);
                })
                .catch(error => {reject(error)});
                }
            });
        });
  },

  fetchAllSalesTrades: function() {
    return new Promise((resolve, reject) => {
        db.connect(URL, function(err) {
            if (err) {
            console.log('Unable to connect to Mongo.')
            } else {
            const collection = db.get().collection('trades');
            collection.find({side: 'SELL'}).toArray()
            .then(response =>  {
                resolve(response);
            })
            .catch(error => {reject(error)});
            }
        });
    });
  },

  getAllMatchingTransports: function(purchaseDate, salesDate, purchaseLoaction, salesLocation) {
      console.log(purchaseDate);
      console.log(salesDate);
      console.log(purchaseLoaction);
      console.log(salesLocation);
      return new Promise((resolve, reject) => {
        db.connect(URL, function(err) {
            if (err) {
            console.log('Unable to connect to Mongo.')
            } else {
            const collection = db.get().collection('transports');
            collection.find({ 
                $and : [
                    { $and: [{loadingDate: {$gte: purchaseDate}}, {loadingDate: {$lt: salesDate}}] },
                    { $and: [{unloadingDate: {$lte: salesDate}}, {unloadingDate: {$gt: purchaseDate}}] },
                    { $and: [{origin: {$eq: purchaseLoaction}}, {destination: {$eq: salesLocation}}]}
            ]   
            }).toArray()
            .then(response =>  {
                console.log(response);
                resolve(response);
            })
            .catch(error => {reject(error)});
            }
        });
      })
  },

  updateTradeStatus: function(updateTradeId, statusToBeUpdated) {
    return new Promise((resolve, reject) => {
        db.connect(URL, function(err) {
          if (err) {
            console.log('Unable to connect to Mongo.');
          } else {
            let query = { trade_id: updateTradeId };
            let newStatusValue = { $set: {status: statusToBeUpdated}}
            const collection = db.get().collection('trades');
            collection.updateOne( query, newStatusValue, function(err, res) {
              err ? reject(err) :
              resolve(res);
            });
          }
        });
      });
  },

  updateTransportsAddTransfer: function(transportId, loadTransferToBeUpdate, unloadTransferToBeUpdate) {
    return new Promise((resolve, reject) => {
        db.connect(URL, function(err) {
          if (err) {
            console.log('Unable to connect to Mongo.');
          } else {
            let query = { transport_id: transportId };
            let newTransportValue = {  $push:  {loadTransfer: loadTransferToBeUpdate, unloadTransfer: unloadTransferToBeUpdate}}
            const collection = db.get().collection('transports');           
            collection.updateOne(query, newTransportValue, function(err, res) {
              err ? reject(err) :
              resolve(res);
            });
          }
        });
      });
  }

}
