const XLSX = require('xlsx');
const path = require('path');


const workBook = XLSX.readFile(path.join(__dirname,'../../','assets/files/','SchoolData.xlsx'));

console.log(XLSX.utils.sheet_to_csv(workBook.Sheets[workBook.SheetNames[0]]));
