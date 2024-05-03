const http = require('http');

const PORT = process.env.PORT || 3000;

http.createServer((req, res) => {
 res.statusCode = 200;
 res.setHeader('Content-Type', 'text/plain');
 res.end('Hello, World!');
}).listen(PORT, err => {
 if (err) {
   console.error(`Error starting server: ${err}`);
   process.exit(1);
 }
 console.log(`Server running on port ${PORT}`);
});