const fs = require('fs');
const Promise = require('promise');
const options = {
    encoding:'utf-8'
}

readFile = function(pathtoFile){

    return new Promise(function(resolve,reject){
        fs.readFile(pathtoFile,options,(err,data)=>{
            if(err){
                reject(err);
            }else{
                resolve(data);
            }  
         });
    });
}

module.exports = {
    readFile:readFile
}