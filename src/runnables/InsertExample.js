const connectUtil = require('../util/connectmongo');
const assert = require('assert');
const fileReader = require('../util/fileReader');
const path = require('path');

insertDocuments = function(err,client){
    let db = client.db('test');

    fileReader.readFile(path.join(__dirname,'../../','/assets/files/','inventoryData.txt'))
    .then(data =>{
        let inventoryData = JSON.parse(data);
        let status = false;
        if(inventoryData.length > 1){
            db.collection('inventory').insertMany(inventoryData);
            status = true;
        }else if(inventoryData.length === 1){
            db.collection('inventory').insertOne(inventoryData);
            status = true;
        }
        client.close();
        return status;
    }).then(status => console.log(status)).catch(err => console.log(err));
}

connectUtil.connectToMongo(insertDocuments);
