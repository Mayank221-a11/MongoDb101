//Installing all necassary libraries required(xlsx)via npm
//Installing mongodb via npm

const reader = require('xlsx');
const file = reader.readFile('icici-prudential-bluechip-fund (3).xlsx');
let data = [];
const sheets = file.SheetNames;

for (let i = 0; i < sheets.length; i++) {
    const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
    temp.forEach((res) => {
        data.push(res);
    });
}

console.log(data);

//conecting to mongodb database



const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://Mayank999:Mayank999@cluster0.m0kqi1g.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db('<MyDb>');// Specified Database
        const collection = database.collection('<Bluechip_fund_test>');

        const file = reader.readFile('icici-prudential-bluechip-fund (3).xlsx');// Specified Database collection
        let data = [];
        const sheets = file.SheetNames;

        for (let i = 0; i < sheets.length; i++) {
            const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
            temp.forEach((res) => {
                data.push(res);
            });
        }

        await collection.insertMany(data);
        console.log('Data inserted successfully!');
    } finally {
        await client.close();
    }
}

run().catch(console.dir);

