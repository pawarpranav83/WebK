const {Client} = require('pg')

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "183923",
    database: "FoodShades"
})
const tablename="subway";
let tableObj;
client.connect();
client.query(`Select * from additionalinfo where resname='${tablename}'`, (err, res)=>{
    if(!err){
        // tableObj=res.rows[0];
        tableObj=res.rows[0];
        console.log(tableObj);
    }
    else{
        console.log(err);
        console.log("Error BUddy")
    }

});
client.end;
console.log(tableObj);
console.log("hey");

