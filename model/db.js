var MongoClient = require('mongodb').MongoClient

var URL = 'mongodb://localhost:27017';

var state = {
  db: null,
}

exports.connect = function(URL, done) {
    if (state.db) return done();
  
    MongoClient.connect(URL, { useNewUrlParser: true })
    .then(client => {
        state.db = client.db('logistics_db');
        done()     
    }).catch(err => done(err));
}
  
exports.get = function() {
    return state.db
}

exports.close = function(done) {
  if (state.db) {
    state.db.close(function(err, result) {
      state.db = null
      state.mode = null
      done(err)
    })
  }
}