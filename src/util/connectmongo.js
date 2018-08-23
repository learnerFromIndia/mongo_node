const MongoClient = require('mongodb').MongoClient;

const uri = 'mongodb://localhost:27017/';
const options = {
     useNewUrlParser: true 
}

connectToMongo = function (callback) {
  MongoClient.connect(uri,options,callback);
}

module.exports.connectToMongo = connectToMongo;