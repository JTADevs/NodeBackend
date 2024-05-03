var http = require('http');
var url = require('url');
var mysql = require('mysql');

// Konfiguracja połączenia z bazą danych
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Hasło do bazy danych
  database: 'shooterapp'
});

// Połączenie z bazą danych
connection.connect(function(err) {
  if (err) {
    console.error('Błąd połączenia z bazą danych:', err.stack);
    return;
  }
  console.log('Połączenie z bazą danych zostało nawiązane.');
});

// Utworzenie serwera HTTP
http.createServer(function (req, res) {
  var parsedUrl = url.parse(req.url, true);
  var pathname = parsedUrl.pathname;

  // Obsługa żądań GET
  if (req.method === 'GET') {
    // Obsługa podstrony "/"
    if (pathname === '/') {
      // Zapytanie do bazy danych
      connection.query('SELECT * FROM users', function (error, results, fields) {
        if (error) {
          console.error('Błąd zapytania do bazy danych:', error);
          res.writeHead(500, {'Content-Type': 'text/html'});
          res.write('<h1>500 Internal Server Error</h1>');
          res.end();
          return;
        }
        // Wyświetlanie danych z bazy na stronie
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<h1>Strona główna</h1>');
        res.write('<ul>');
        results.forEach(function(user) {
          res.write('<li>Email: ' + user.email + ', Hasło: ' + user.password + '</li>');
        });
        res.write('</ul>');
        res.end();
      });
    }
    // Obsługa nieznanej podstrony
    else {
      res.writeHead(404, {'Content-Type': 'text/html'});
      res.write('<h1>404 Not Found</h1>');
      res.end();
    }
  }
}).listen(80); // Serwer nasłuchuje na porcie 80
