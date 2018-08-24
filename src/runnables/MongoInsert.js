const MongoClient = require('mongodb').MongoClient;

const options = {
    useNewUrlParser: true
}
const url = "mongodb://localhost:27017/";

MongoClient.connect(url,options,(err,client)=>{
    let db = client.db('test');
    db.createCollection('students').then((collection)=>{
        let cursor = collection.find({});
        cursor.count().then(count=>{
            if(count > 0){
                let query = {age:{$gt:10}};
                let sort = {age:-1};
                let project = {name:1,age:1,_id:0};
                cursor = collection.find(query).project(project).sort(sort);
                cursor.forEach((data)=>{console.log(data)});
                client.close();
            }else{
              collection.insertMany([
                {name:'ajith',age:12,class:'1A'},
                {name:'rohith',age:10,class:'1A'},
                {name:'prashanth',age:11,class:'1A'}
              ],(err,res)=>{
                 if(err) throw err;
                 console.log('Inserted '+res.insertedCount+' documents');
                 client.close();
              });
            }
        }).catch(err => {
            console.log('error..')
            client.close();
        });
    }).catch(err => {
        console.log('problem creating new collection');
        client.close();
    })
  
});