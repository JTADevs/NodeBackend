const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Połączenie z bazą danych
const conn = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "zaq1@WSX",
  database: "bikebazar"
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Nawiązanie połączenia z bazą danych
conn.connect(function(err) {
  if (err) throw err;
  console.log("Connected to MySQL database!");
});

app.get('/', () => {
  console.log('test')
  res.status(200).json({mess:'test'});
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
  if (!user_uid) {
    return res.status(400).send('user_uid is required');
  }

  const sqlAnnouncements = "SELECT * FROM announcements WHERE user_uid = ?";
  conn.query(sqlAnnouncements, [user_uid], (err, announcements) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }

    if (announcements.length === 0) {
      return res.status(200).json([]);
    }

    // Mapowanie obrazów do ogłoszeń z kodowaniem Base64
    const announcementMap = announcements.map(announcement => {
      let images = [];

      // Sprawdź, czy announcement istnieje i dodaj obrazy do tablicy, jeśli istnieją
      if (announcement) {
        if (announcement.image1) {
          images.push(announcement.image1.toString('base64'));
        }
        if (announcement.image2) {
          images.push(announcement.image2.toString('base64'));
        }
        if (announcement.image3) {
          images.push(announcement.image3.toString('base64'));
        }
        if (announcement.image4) {
          images.push(announcement.image4.toString('base64'));
        }
      }
      console.log(images);

      return {
        id: announcement.id,
        title: announcement.title,
        description: announcement.description,
        price: announcement.price,
        images: images
      };
    });

    res.status(200).json(announcementMap);
  });
});

// Obsługa żądań POST dla /addAnnouncement
app.post('/announcement/add', upload.array('images', 4), (req, res) => {
  const { user_uid, title, description, price } = req.body;
  const images = req.files.map(file => file.buffer); // Pobieranie obrazów z requesta

  try {
    const sqlQuery = 'INSERT INTO announcements (user_uid, title, description, price, image1, image2, image3, image4) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    conn.query(sqlQuery, [user_uid, title, description, price, images[0]??null, images[1]??null, images[2]??null, images[3]??null], function (err, result) {
      if (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
      }
      res.status(200).send('New record added successfully');
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Uruchomienie serwera na porcie 80
const server = app.listen(80, () => {
  console.log(`Server is running on port ${server.address().port}`);
});

// const conn = mysql.createConnection({
//   host: "localhost",
//   port: 3306,
//   user: "root",
//   password: "",
//   database: "bikebazar"
// });

// app.post('/upload', upload.single('image'), (req, res) => {
//   const image = req.file.buffer; // Bufor z obrazem
//   const sql = 'INSERT INTO images (image) VALUES (?)';

//   conn.query(sql, [image], (err, result) => {
//     if (err) {
//       return res.status(500).send(err);
//     }
//     res.send('Image uploaded!');
//   });
// });

// app.get('/image/:id', (req, res) => {
//   const id = req.params.id;
//   const sql = 'SELECT image FROM images WHERE id = ?';

//   conn.query(sql, [id], (err, result) => {
//     if (err) {
//       return res.status(500).send(err);
//     }
//     if (result.length === 0) {
//       return res.status(404).send('Image not found');
//     }

//     const image = result[0].image;
//     res.writeHead(200, {
//       'Content-Type': 'image/jpeg', // Zakładając, że obraz jest w formacie JPEG
//       'Content-Length': image.length
//     });
//     res.end(image);
//   });
// });

// Obsługa innych typów żądań
// app.all('*', (req, res) => {
//   console.log('Method Not Allowed');
//   res.status(405).send('Method Not Allowed');
// });

// Obsługa żądań POST dla /register
// app.post('/register', (req, res) => {
//   const { email, password } = req.body;

//   const sqlQuery = 'INSERT INTO account (email, password) VALUES (?, ?)';
//   conn.query(sqlQuery, [email, password], function (err, result) {
//     if (err) {
//       console.error(err);
//       res.status(500).send('Internal Server Error');
//       return;
//     }
//     console.log('New record added successfully');
//     res.status(200).send('New record added successfully');
//   });
// });

// // Obsługa żądań POST dla /register
// app.post('/login', (req, res) => {
//   const { email, password } = req.body;

//   const sqlQuery = 'SELECT * FROM account WHERE email = ? AND password = ?';
//   conn.query(sqlQuery, [email, password], function (err, result) {
//     if (err) {
//       console.error(err);
//       res.status(500).send('Internal Server Error');
//       return;
//     }
//     console.log('New record added successfully');
//     res.status(200).send('New record added successfully');
//   });
// });