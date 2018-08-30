const MongoClient = require('mongodb').MongoClient;

const options = {
    useNewUrlParser: true
}
const url = "mongodb://localhost:27017/";

const dbname = 'test';
const collection = 'institutiondata';

//$sum $max $min $first $last $unwind $match $group $sort
const aggregateQuery = [
 {$match:{state:"Andhra Pradesh"}},
 {$unwind:'$levels'},
 {$group:{_id:"$state",totalGovt:{$sum:"$levels.government"},
 totallocalbodies:{$sum:"$levels.localBodies"},
 totalprivateaided:{$sum:"$levels.privateAided"},
 totalprivateUnaided:{$sum:"$levels.privateUnaided"}},

},
 //{$sort:{_id:1}}
];

MongoClient.connect(url,options,(err,client)=>{

    let db = client.db(dbname);
    db.collection(collection).aggregate(aggregateQuery,function(err,cursor){
       cursor.forEach(element => {
           console.log(element)
       });
       client.close();
    });
});