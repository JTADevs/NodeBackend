var http = require('http');
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  database: 'test',
  user: 'root',
  password: 'root',
});

connection.connect(function (err) {
  if(err){
    console.log("error occurred while connecting");
  }
  else{
    console.log("connection created with Mysql successfully");
  }
});

//create a server object:
http.createServer(function (req, res) {
  // console.log(`Database Connected`)
  // connection.query(`SHOW DATABASES`,
  //   function (err, result) {
  //     if (err) {
  //       console.log(`Error executing the query`)
  //       //console.log(`Error executing the query - ${err}`)
  //       res.write('jd1');
  //     } else {
  //       console.log("Result: ", result)
  //       res.write('jd2');
  //     }
  //   })
  // res.write('jd3');
  res.end(); // Zakończ odpowiedź w przypadku błędu
}).listen(80); //the server object listens on port 80
