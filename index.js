var http = require('http');
const connection = require('./db');

//create a server object:
http.createServer(function (req, res) {
  connection.connect(function (err) {
    if (err) {
        console.log("Error in the connection")
        console.log(err)
    } else {
      console.log(`Database Connected`)
      connection.query(`SHOW DATABASES`,
        function (err, result) {
          if (err) {
            console.log(`Error executing the query - ${err}`)
            res.write('jd1');
          } else {
            console.log("Result: ", result)
            res.write('jd2');
          }
        })
    }
  })
  res.write('jd3');
  res.end(); // Zakończ odpowiedź w przypadku błędu
}).listen(80); //the server object listens on port 80
