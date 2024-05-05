const http = require('http');
const url = require('url');
const mysql = require('mysql');

// Tworzenie połączenia z bazą danych
var conn = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "zaq1@WSX",
  database: "shooterapp"
});

// Nawiązywanie połączenia z bazą danych
conn.connect(function(err) {
  if (err) throw err;
  console.log("Connected to MySQL database!");
});

// Tworzenie serwera HTTP
http.createServer(function (req, res) {
  if (req.method === 'POST') {
    conn.query("SELECT * FROM account", function (err, result, fields) {
      if (err) {
        console.error(err);
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end('Internal Server Error');
        return;
      }
      //console.log(result); // Wynik zapytania

      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(result));

      // res.writeHead(200, {'Content-Type': 'text/plain'});
      // res.write('Result from database: ' + JSON.stringify(result)); // Zapisanie wyniku do odpowiedzi HTTP
      // res.end();
    });
  } else if (req.method === 'GET') {
    conn.query("SELECT * FROM account", function (err, result, fields) {
      if (err) {
          console.error(err);
          res.writeHead(500, {'Content-Type': 'text/plain'});
          res.end('Internal Server Error');
          return;
      }
      // Wysłanie odpowiedzi HTTP z wynikiem zapytania
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(result));
  });
  } else {
    // Obsługa innych metod HTTP
    res.writeHead(405, {'Content-Type': 'text/plain'});
    res.end('Method Not Allowed');
  }
}).listen(80);
