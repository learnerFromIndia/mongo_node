const MongoClient = require('mongodb').MongoClient;

const options = {
    useNewUrlParser: true
}
const url = "mongodb://localhost:27017/";

MongoClient.connect(url,options,(err,client)=>{
    let db = client.db('test');
    let collection = db.collection('students');
    collection.deleteMany({class:'2A'},(err,res)=>{
        if(err) throw err;
        console.log(`Deleted ${res.deletedCount} records`);
        collection.find({}).count().then((count) => { 
            if(count === 0){
                collection.insertMany([
                    {name:'ajith',age:10,class:'1A'},
                    {name:'rohith',age:10,class:'1A'},
                    {name:'prashanth',age:12,class:'1A'}
                ],(err,res)=>{
                    if(err) throw err;
                    console.log(`Inserted ${res.insertedCount} records`);
                });
            }else{
                collection.updateMany({},{$set:{active:true},$currentDate:{lastupdateDt:true}},(err,res)=>{
                    if(err) throw err;
                    console.log(`Updated ${res.modifiedCount} records`);
                   client.close();
              });
              
            }
        });
    })
});