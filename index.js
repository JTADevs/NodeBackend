var http = require('http');
var url = require('url');

// Create a server object:
http.createServer(function (req, res) {
  var parsedUrl = url.parse(req.url, true);
  var pathname = parsedUrl.pathname;

  // Obsługa żądań GET
  if (req.method === 'GET') {
    // Obsługa podstrony "/"
    if (pathname === '/') {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write('<h1>Strona główna</h1>');
      res.end();
    }
    // Obsługa podstrony "/about"
    else if (pathname === '/about') {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write('<h1>O nas</h1>');
      res.end();
    }
    // Obsługa podstrony "/contact"
    else if (pathname === '/contact') {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write('<h1>Kontakt</h1>');
      res.end();
    }
    // Obsługa nieznanej podstrony
    else {
      res.writeHead(404, {'Content-Type': 'text/html'});
      res.write('<h1>404 Not Found</h1>');
      res.end();
    }
  }
  // Obsługa żądań POST
  else if (req.method === 'POST') {
    // Obsługa podstrony "/submit"
    if (pathname === '/submit') {
      var body = '';
      req.on('data', function (data) {
        body += data;
      });
      req.on('end', function () {
        console.log('Received POST data:', body);
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<h1>Dane zostały wysłane metodą POST</h1>');
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
}).listen(80); // The server object listens on port 80
