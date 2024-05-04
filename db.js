const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    database: 'shooterapp',
    user: 'root',
    password: 'root',
});

connection.connect(function (err) {
    if (err){
        console.log("error")
    }else{
        console.log("git")
    }
});

module.exports = connection;