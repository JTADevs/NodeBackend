// const http = require('http');
// const url = require('url');
// const mysql = require('mysql');

// // Tworzenie połączenia z bazą danych
// var conn = mysql.createConnection({
//   host: "localhost",
//   port: 3306,
//   user: "root",
//   password: "zaq1@WSX",
//   database: "shooterapp"
// });

// // Nawiązywanie połączenia z bazą danych
// conn.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected to MySQL database!");
// });

// // Tworzenie serwera HTTP
// http.createServer(function (req, res) {
//   const parsedUrl = url.parse(req.url, true);

//   if (req.method === 'POST') {
//     let body = '';
//     req.on('data', function(chunk) {
//         body += chunk.toString();
//     });

//     req.on('end', function() {
//       if (parsedUrl.pathname === '/get') {
//         conn.query("SELECT * FROM account", function (err, result, fields) {
//           if (err) {
//             console.error(err);
//             res.writeHead(500, {'Content-Type': 'text/plain'});
//             res.end('Internal Server Error');
//             return;
//           }
          
//           res.writeHead(200, {'Content-Type': 'application/json'});
//           res.end(JSON.stringify(result));
//         });
//       } else if (parsedUrl.pathname === '/register') {
//         const postData = JSON.parse(body);

//         const newRecord = {
//           email: postData.email,
//           password: postData.password
//         };

//         const sqlQuery = 'INSERT INTO account (email, password) VALUES (?, ?)';
//         conn.query(sqlQuery, [newRecord.email, newRecord.password], function (err, result) {
//           if (err) {
//             console.error(err);
//             res.writeHead(500, {'Content-Type': 'text/plain'});
//             res.end('Internal Server Error');
//             return;
//           }

//           res.writeHead(200, {'Content-Type': 'text/plain'});
//           res.end('New record added successfully');
//         });
//       } else if (parsedUrl.pathname === '/login') {

//       }
//     });
//   } else if (req.method === 'GET') {
//     conn.query("SELECT * FROM account", function (err, result, fields) {
//       if (err) {
//           console.error(err);
//           res.writeHead(500, {'Content-Type': 'text/plain'});
//           res.end('Internal Server Error');
//           return;
//       }
      
//       res.writeHead(200, {'Content-Type': 'application/json'});
//       res.end(JSON.stringify(result));
//     });
//   } else {
//     res.writeHead(405, {'Content-Type': 'text/plain'});
//     res.end('Method Not Allowed');
//   }
// }).listen(80);


const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();

// Ustawienia CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// Parsowanie danych z formularzy
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Połączenie z bazą danych
const conn = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "zaq1@WSX",
  database: "shooterapp"
});

// Nawiązanie połączenia z bazą danych
conn.connect(function(err) {
  if (err) throw err;
  console.log("Connected to MySQL database!");
});

// Obsługa żądań GET dla /get
app.get('/get', (req, res) => {
  conn.query("SELECT * FROM account", function (err, result, fields) {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.status(200).json(result);
  });
});

// Obsługa żądań POST dla /register
app.post('/register', (req, res) => {
  const { email, password } = req.body;

  const sqlQuery = 'INSERT INTO account (email, password) VALUES (?, ?)';
  conn.query(sqlQuery, [email, password], function (err, result) {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.status(200).send('New record added successfully');
  });
});

// Obsługa innych typów żądań
app.all('*', (req, res) => {
  res.status(405).send('Method Not Allowed');
});

// Uruchomienie serwera na porcie 80
const server = app.listen(80, () => {
  console.log(`Server is running on port ${server.address().port}`);
});
