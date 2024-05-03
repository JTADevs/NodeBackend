var http = require('http');
const connection = require('./db');

//create a server object:
http.createServer(function (req, res) {
  const sqlQuery = 'SELECT * FROM users';
  connection.query(sqlQuery, (err, results) => {
    if (err) {
      console.error('Błąd zapytania:', err);
      res.write('Błąd zapytania:');
    }
    console.log('Wyniki zapytania:', results);
    res.write('Wyniki zapytania:');
  });
  res.write('jd');
  res.end(); // Zakończ odpowiedź w przypadku błędu
}).listen(80); //the server object listens on port 80
