const fs = require('fs');
const path = require('path');
const http = require('http');

const PORT = 8086;

http.createServer(function (req, res) {
  if (req.url.includes('web.png')) {
    res.setHeader('Content-Type', 'image/png');
    res.statusCode = 200;
    res.end(fs.readFileSync(path.resolve(__dirname, 'web.png')));
  } else if (req.url === '/') {
    res.setHeader('Set-Cookie', 'sample-token=abcd; Domain=.example.com');
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(fs.readFileSync(path.resolve(__dirname, 'index.html')));
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
}).listen(PORT);

console.log(`Server listening on port ${PORT}.`);
