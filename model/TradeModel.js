var db = require('./db');

const URL = 'mongodb://root:root_123@ds157964.mlab.com:57964/poc_logistics_db';

module.exports = {
  fetchAllTrades: function (callback) {
    db.connect(URL, function(err) {
        if (err) {
          console.log(err);
          console.log('Unable to connect to Mongo.')
        } else {
          const collection = db.get().collection('trades');
          collection.find({}).toArray()
          .then(response =>  {
            callback('success', response)
          })
          .catch(error => callback('error', error));
        }        
    });
  },

  addNewTrade: function(newTrade, callback) {
    db.connect(URL, function(err) {
      if (err) {
        console.log('Unable to connect to Mongo.');
      } else {
        const collection = db.get().collection('trades');
        collection.insertOne( newTrade, function(err, res) {
          err ? callback('error', err) :
          callback('success', res);
        })
      }
    });
  },

  updateTrade: function(tradeId, editTrade, callback) {
    db.connect(URL, function(err) {
      if (err) {
        console.log('Unable to connect to Mongo.');
      } else {
        let query = { trade_id: tradeId };
        let newTradeValue = { $set: editTrade}
        const collection = db.get().collection('trades');
        collection.updateOne( query, newTradeValue, function(err, res) {
          err ? callback('error', err) :
          callback('success', res);
        });
      }
    });
  },

  deleteTrade: function(tradeId, callback) {
    db.connect(URL, function(err) {
      if (err) {
        console.log('Unable to connect to Mongo.');
      } else {
        let query = { trade_id: tradeId };
        const collection = db.get().collection('trades');
        collection.deleteOne( query, function(err, res) {
          if(err) { callback('error', err); }
          callback('success', res);
        });
      }
    });
  }
}
