const fileReader = require('../util/fileReader').readFile;
const path = require('path');
const MongoClient = require('mongodb').MongoClient;

const options = {
    useNewUrlParser: true
}
const url = "mongodb://localhost:27017/";

const filename = 'schooldata.csv';

function SchoolData(schooltype,state,yearlyData){

    this.schooltype=schooltype;
    this.state=state;
    this.d2001=yearlyData[0];
    this.d2002=yearlyData[1];
    this.d2003=yearlyData[2];
    this.d2004=yearlyData[3];
    this.d2005=yearlyData[4];
    this.d2006=yearlyData[5];
    this.d2007=yearlyData[6];
    this.d2008=yearlyData[7];
    this.d2009=yearlyData[8];
    this.d2010=yearlyData[9];

}

fileReader(path.join(__dirname,'../..','/assets/files/',filename)).then(data => {
    let schoolData = parseCsvData(data);
    insertIntoDatabase(schoolData);
}).catch(err => {
    console.log(err);
})


parseCsvData = function(data){

    let allObjs = [];
    let rows = data.split('\n');
    rows.slice(1).forEach(value=>{
       let singleRowValues = value.split(',').map(x => x.replace('"',''));

       let schoolNumbers = singleRowValues.slice(2).map(x => {
        let y = x.replace(',','');
           return parseInt(y);
       });


       let obj = new SchoolData(singleRowValues[0],singleRowValues[1],schoolNumbers);
        allObjs.push(obj);
    });

    return allObjs;
}

insertIntoDatabase = function(data){
    MongoClient.connect(url,options,(err,client)=>{
        let db = client.db('test');
        db.createCollection('schooldata').then((collection)=>{
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
