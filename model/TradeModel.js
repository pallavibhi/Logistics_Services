var db = require('./db');

module.exports = {
  fetchAllTrades: function (callback) {
    db.connect('mongodb://localhost:27017/', function(err) {
        if (err) {
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
      db.connect('mongodb://localhost:27017/', function(err) {
        if (err) {
          console.log('Unable to connect to Mongo.')
        } else {
          const collection = db.get().collection('trades');
            collection.insertOne( newTrade, function(err, res) {
              err ? callback('error', err) :
                    callback('success', res);
            })
            
        }        
      });
    }
}