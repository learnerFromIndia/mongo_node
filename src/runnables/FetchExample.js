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
    var cursor = inventory.find({
     sellers:{$exists:1}
    }).project({
      item:1,status:1,_id:0
    });
    cursor.forEach(function(err,doc){
     if(err) throw err;
       
     console.log(doc);
    });
    callback();
}
 
  connectUtil.connectToMongo(fetchDocument);