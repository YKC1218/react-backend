const mysql = require("mysql");

const mysqlConnection = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : "nodeft"
});



mysqlConnection.connect((err)=>{
    if(!err)
        {
            console.log("Connected");
        }
    else
        {
            console.log("Connection Failed");
        }
})

module.exports = mysqlConnection;