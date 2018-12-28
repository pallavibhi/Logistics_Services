var db = require('./db');

const URL = 'mongodb://root:root_123@ds157964.mlab.com:57964/poc_logistics_db';

module.exports = {
  fetchAllTransports: function () {
    return new Promise((resolve, reject) => {
        db.connect(URL, function(err) {
            if (err) {
              console.log('Unable to connect to Mongo.')
            } else {
              const collection = db.get().collection('transports');
              collection.find({}).toArray()
              .then(response =>  {
                  resolve(response);
              })
              .catch(error => {reject(error)});
            }
        });
    });
  },

  addNewTransport: function(newTransport) {
    return new Promise((resolve, reject) => {
      db.connect(URL, function(err) {
        if (err) {
          console.log('Unable to connect to Mongo.');
        } else {
          const collection = db.get().collection('transports');
          collection.insertOne( newTransport, function(err, res) {
            err ? reject(err) :
            resolve(res);
          })
        }
      });
  });
  },

  updateTransport: function(transportId, editTransport) {
    return new Promise((resolve, reject) => {
      console.log(transportId, editTransport);
      db.connect(URL, function(err) {
        if (err) {
          console.log('Unable to connect to Mongo.');
        } else {
          let query = { transport_id: transportId };
          let newTransportValue = { $set: editTransport}
          const collection = db.get().collection('transports');
          collection.updateOne( query, newTransportValue, function(err, res) {
            err ? reject(err) :
            resolve(res);
          });
        }
      });
    });
  },

  deleteTransport: function(transportId) {
    return new Promise((resolve, reject) => {
      db.connect(URL, function(err) {
        if (err) {
          console.log('Unable to connect to Mongo.');
        } else {
          let query = { transport_id: transportId };
          const collection = db.get().collection('transports');
          collection.deleteOne( query, function(err, res) {
            if(err) { reject(err); }
            resolve(res);
          });
        }
      });
    });
  },

  
  getTradesToTransports: function(tradeIds) {
    return new Promise((resolve, reject) => {
      console.log('*********',tradeIds);
        db.connect(URL, function(err) {
            if (err) {
            console.log('Unable to connect to Mongo.')
            } else {
            const collection = db.get().collection('trades');
            collection.find({trade_id: {$in: tradeIds}}).toArray()
            .then(response =>  {
                resolve(response);
            })
            .catch(error => {reject(error)});
            }
        });
    });
  }
}
