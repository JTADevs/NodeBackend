const mysql = require('mysql2');

// Tworzenie połączenia z bazą danych
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'animalshelter'
});

// Sprawdzenie połączenia
connection.connect(function(err) {
  if (err) {
    console.error('Błąd połączenia:', err.stack);
    return;
  }
  console.log('Połączenie z bazą danych zostało ustanowione.');
});

module.exports = connection;