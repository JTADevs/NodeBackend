var http = require('http');
var mysql = require('mysql');

// Tworzenie połączenia z bazą danych
var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "zaq1@WSX",
  database: "shooterapp"
});

// Tworzenie serwera HTTP
http.createServer(function (req, res) {
  conn.connect(function(err) {
    if (err) console.log(err);
    else{
      console.log("Connected to MySQL database!");
      conn.query("SELECT * FROM users", function (err, result, fields) {
        if (err) throw err;
        console.log(result); // Wynik zapytania
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write('Result from database: ' + JSON.stringify(result)); // Zapisanie wyniku do odpowiedzi HTTP
        res.end();
      });
    };
  });
}).listen(8080);

console.log('Server running at http://localhost:8080/');
