var http = require('http');
var mysql = require('mysql');

// Tworzenie połączenia z bazą danych
var conn = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "zaq1@WSX",
  // database: "shooterapp"
});

// Nawiązywanie połączenia z bazą danych
conn.connect(function(err) {
  if (err) throw err;
  console.log("Connected to MySQL database!");
});

// Tworzenie serwera HTTP
http.createServer(function (req, res) {
  // conn.query("SELECT * FROM users", function (err, result, fields) {
  //   if (err) throw err;
  //   console.log(result); // Wynik zapytania
  //   res.writeHead(200, {'Content-Type': 'text/plain'});
  //   res.write('Result from database: ' + JSON.stringify(result)); // Zapisanie wyniku do odpowiedzi HTTP
  //   res.end();
  // });
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write('Result');
  res.end();
}).listen(80);
