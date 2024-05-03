const mysql = require('mysql');

// Połączenie z bazą danych
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Dostosuj hasło do Twojej konfiguracji
  database: 'shooterapp' // Nazwa Twojej bazy danych
});

// Sprawdzenie połączenia
connection.connect((err) => {
    if (err) {
        console.error('Błąd połączenia z bazą danych:', err);
        return;
    }
    console.log('Połączono z bazą danych MySQL');
});

module.exports = connection;