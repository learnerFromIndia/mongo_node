const MongoClient = require('mongodb').MongoClient;

const options = {
    useNewUrlParser: true
}
const url = "mongodb://localhost:27017/";

MongoClient.connect(url,options,(err,client)=>{
    let db = client.db('test');
    let collection = db.collection('students');
    
    collection.bulkWrite([
       {
         insertOne:{
             "document":{
                name:'arun',class:'1A',age:11,marks:{social:10,science:7,maths:4}
             }
         }
       },
       {
           insertOne:{
               "document":{
                name:'rahul',class:'1A',age:10,marks:{social:12,science:8,maths:8}
             }
            
           }
       },
       {
         updateOne:{
               "filter":{name:'rohith'},
               "update":{$inc:{"marks.social":5}}
           }
       },
       {
         deleteOne:{
               "filter":{age:{$lte:10},"marks.social":{$lt:20,$gt:10}}
         }
       },{
        updateMany:{
            "filter":{},
            "update":{$unset:{"lastupdateDt":''}}
        }
       }
    ]).then(res =>{
        console.log(res);
        client.close();
    }).catch(err => {console.log(err)})



});