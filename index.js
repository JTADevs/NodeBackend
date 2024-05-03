var http = require('http');
const connection = require('./db');

//create a server object:
http.createServer(function (req, res) {
  connection.query('SELECT * FROM users', function(err, results, fields) {
    if (err) {
      res.write('Błąd zapytania:', err);
      return;
    }
    res.write('Wyniki zapytania:', results);
  });
  res.end(); //end the response
}).listen(80); //the server object listens on port 80