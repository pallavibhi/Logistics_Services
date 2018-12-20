var db = require('./db');

const URL = 'mongodb://root:root_123@ds157964.mlab.com:57964/poc_logistics_db';

module.exports = {
  fetchAllTrades: function () {
    return new Promise((resolve, reject) => {
        db.connect(URL, function(err) {
            if (err) {
              console.log('Unable to connect to Mongo.')
            } else {
              const collection = db.get().collection('trades');
              collection.find({}).toArray()
              .then(response =>  {
                  resolve(response);
              })
              .catch(error => {reject(error)});
            }
        });
    });
  },

  addNewTrade: function(newTrade) {
    return new Promise((resolve, reject) => {
      db.connect(URL, function(err) {
        if (err) {
          console.log('Unable to connect to Mongo.');
        } else {
          const collection = db.get().collection('trades');
          collection.insertOne( newTrade, function(err, res) {
            err ? reject(err) :
            resolve(res);
          })
        }
      });
  });
  },

  updateTrade: function(tradeId, editTrade) {
    return new Promise((resolve, reject) => {
      db.connect(URL, function(err) {
        if (err) {
          console.log('Unable to connect to Mongo.');
        } else {
          let query = { trade_id: tradeId };
          let newTradeValue = { $set: editTrade}
          const collection = db.get().collection('trades');
          collection.updateOne( query, newTradeValue, function(err, res) {
            err ? reject(err) :
            resolve(res);
          });
        }
      });
    });
  },

  deleteTrade: function(tradeId) {
    return new Promise((resolve, reject) => {
      db.connect(URL, function(err) {
        if (err) {
          console.log('Unable to connect to Mongo.');
        } else {
          let query = { trade_id: tradeId };
          const collection = db.get().collection('trades');
          collection.deleteOne( query, function(err, res) {
            if(err) { reject(err); }
            resolve(res);
          });
        }
      });
    });
  }
}
