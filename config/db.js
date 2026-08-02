const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.connect((err)=>{
    if(err){
        console.log("Database Connection Failed");
    }else{
        console.log("Database Connected");
    }
});

connection.query("SELECT DATABASE() AS db", (err, result) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Connected Database:", result[0].db);
    }
});

connection.query("SELECT DATABASE() AS db", (err, result) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Connected Database:", result[0].db);
    }
});

connection.query("SHOW COLUMNS FROM chains", (err, result) => {
    if (err) {
        console.log(err);
    } else {
        console.table(result);
    }
});
module.exports = connection;