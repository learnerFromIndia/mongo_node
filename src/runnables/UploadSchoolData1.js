const fileReader = require('../util/fileReader').readFile;
const path = require('path');
const MongoClient = require('mongodb').MongoClient;

const options = {
    useNewUrlParser: true
}
const url = "mongodb://localhost:27017/";
const filename = 'data.csv';
const levels = ['Senior Secondary Schools','Secondary Schools','Upper Primary Schools','Primary Schools','Pre-Primary Schools']
const institutionType = ['Government','Local Bodies','Private Aided','Private Unaided'];

function InstitutionsData(state,levels){
    this.state=state;
    this.levels=levels;
}

function Level(type,government,localBodies,privateAided,privateUnaided){
    this.type=type;
    this.government=government;
    this.localBodies=localBodies;
    this.privateAided=privateAided;
    this.privateUnaided=privateUnaided;
}

fileReader(path.join(__dirname,'../..','/assets/files/',filename)).then(data => {
    let institutionDataByState = parseCsvData(data);
    insertIntoDatabase(institutionDataByState);
}).catch(err => {
    console.log(err);
})

parseCsvData = function(data){

    let allObjs = [];
    let rows = data.split('\n');
    rows.forEach(value=>{
       let singleRowValues = value.split(',');
       let increment = 0;
       let state = singleRowValues[0];
       let levelarr = [];
       let obj = new InstitutionsData(state,levelarr);
       let dataArr = singleRowValues.splice(1);
       for(let i=0;i<levels.length;i++){
        let type = levels[i];
        let level = new Level(type,null,null,null,null);
        let j=0;
        for(;j<institutionType.length;j++){
            let data = isNaN(parseInt(dataArr[increment+j])) === true ? 0 : parseInt(dataArr[increment+j]);
            switch(j){
                case 0: 
                level.government = data;
                   break;
                case 1: 
                level.localBodies = data;
                  break;
                case 2: 
                level.privateAided = data;
                  break;
                case 3: 
                level.privateUnaided = data;
                  break;
            }
        }
        levelarr.push(level);
        increment += j;
       }
       obj.levels = levelarr;
       allObjs.push(obj);
    });

    return allObjs;
}

insertIntoDatabase = function(data){
    MongoClient.connect(url,options,(err,client)=>{
        let db = client.db('test');
        db.createCollection('institutiondata').then((collection)=>{
            collection.insertMany(data,(err,res)=>{
                     if(err) throw err;
                     console.log('Inserted '+res.insertedCount+' documents');
                     client.close();
                  });
            }).catch(err => {
                console.log('problem creating new collection');
                client.close();
            })
        });
}
