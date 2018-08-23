const connectUtil = require('../util/connectmongo');
const assert = require('assert');

fetchDocument = function (err,client){
    var db = client.db('test');
    assert.equal(err,null);
    console.log('Connected to Mongo db');
  
     findCanvas(db,function(){
      client.close();
    })
}
  
findCanvas = function(db,callback){
    var inventory = db.collection('inventory');
    inventory.find({
     qty:{$elemMatch:{$gt:0,$lt:100}}
    }).project({
      item:1,status:1,_id:0
    }).toArray(function(err,docs){
      console.log(docs);
    });
    callback();
}
 
  connectUtil.connectToMongo(fetchDocument);