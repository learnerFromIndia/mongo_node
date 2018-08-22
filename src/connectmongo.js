var MongoClient = require('mongodb').MongoClient;

var uri = 'mongodb://localhost:27017/test';
var options = {
     useNewUrlParser: true 
}
MongoClient.connect(uri,options,(err,client) =>{

 if(err)
   console.log('Couldnt connect to mongo db',err); 
 else 
   console.log('Connected to Mongo db');

});