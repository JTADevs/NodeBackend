var http = require('http');
var mysql = require('mysql');

// Tworzenie połączenia z bazą danych
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'shooterapp'
});

// Nawiązywanie połączenia
connection.connect();

// Tworzenie serwera HTTP
http.createServer(function (req, res) {
  // Obsługa żądania GET na podstronie /get
  if (req.url === '/get') {
    // Wykonaj zapytanie SQL do pobrania danych z bazy danych
    connection.query('SELECT * FROM users', function (error, results, fields) {
      if (error) throw error;
      // Wysyłanie danych w formie odpowiedzi
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write(JSON.stringify(results));
      res.end();
    });
  } else {
    // Wysyłanie pustej odpowiedzi dla innych żądań
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end();
  }
}).listen(80);

// Zamykanie połączenia z bazą danych po zamknięciu serwera
process.on('SIGINT', function() {
  connection.end();
  process.exit();
});
