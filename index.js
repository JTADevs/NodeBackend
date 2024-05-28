const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();

// Ustawienia CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// Parsowanie danych z formularzy
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Połączenie z bazą danych
// const conn = mysql.createConnection({
//   host: "localhost",
//   port: 3306,
//   user: "root",
//   password: "zaq1@WSX",
//   database: "shooterapp"
// });
const conn = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bike_bazar"
});


// Nawiązanie połączenia z bazą danych
conn.connect(function(err) {
  if (err) throw err;
  console.log("Connected to MySQL database!");
});

// Obsługa żądań GET dla /get
app.get('/announcement/getAll', (req, res) => {
  conn.query("SELECT * FROM announcements", function (err, result, fields) {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }
    console.log(result);
    res.status(200).json(result);
  });
});

// Obsługa żądań GET dla /get
app.get('/announcement/getByUser', (req, res) => {
  const { user_uid } = req.query;
  conn.query("SELECT * FROM announcements WHERE user_uid = ?", [user_uid], function (err, result, fields) {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }
    console.log(result);
    res.status(200).json(result);
  });
});

// Obsługa żądań POST dla /addAnnouncement
app.post('/announcement/add', (req, res) => {
  const { user_uid, title, description, price } = req.body;

  const sqlQuery = 'INSERT INTO announcements (user_uid, title, description, price) VALUES (?, ?, ?, ?)';
  conn.query(sqlQuery, [user_uid, title, description, price], function (err, result) {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }
    console.log('New record added successfully');
    res.status(200).send('New record added successfully');
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
    console.log('New record added successfully');
    res.status(200).send('New record added successfully');
  });
});

// Obsługa żądań POST dla /register
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const sqlQuery = 'SELECT * FROM account WHERE email = ? AND password = ?';
  conn.query(sqlQuery, [email, password], function (err, result) {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }
    console.log('New record added successfully');
    res.status(200).send('New record added successfully');
  });
});

// Obsługa innych typów żądań
// app.all('*', (req, res) => {
//   console.log('Method Not Allowed');
//   res.status(405).send('Method Not Allowed');
// });

// Uruchomienie serwera na porcie 80
const server = app.listen(90, () => {
  console.log(`Server is running on port ${server.address().port}`);
});
