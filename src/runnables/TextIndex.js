const MongoClient = require('mongodb').MongoClient;

const options = {
    useNewUrlParser: true
}
const url = "mongodb://localhost:27017/";

MongoClient.connect(url,options,(err,client)=>{
    let db = client.db('test');

    db.createIndex('stores',{name:"text",description:"text"},(err)=>{
       if (err) {throw err;}

       console.log('Index Created');
 
       //let cursor = db.collection('stores').find({$text:{$search:"coffee java"}});

       let cursor = db.collection('stores').find({$text:{$search:"coffee"}},{score:{$meta:"textScore"}}).sort({score:{$meta:"textScore"}})
       cursor.forEach((doc,error)=>{
        if (error) {throw error;}
        console.log(doc);
       });
       client.close();
    })

});