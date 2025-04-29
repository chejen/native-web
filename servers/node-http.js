const fs = require('fs');
const path = require('path');
const http = require('http');

const PORT = 8081;

http.createServer(function (req, res) {
  if (req.method === 'GET' && req.url === '/api/data') {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.statusCode = 200;
    const data = {
      message: 'Hello from the Node.js API!',
      timestamp: new Date().toISOString(),
      status: 'success'
    };
    res.end(JSON.stringify(data));
  } else if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(fs.readFileSync(path.resolve(__dirname, 'index.html')));
  } else {
    res.writeHead(200);
    res.end('hello world\n');
  }
}).listen(PORT);

console.log(`Server listening on port ${PORT}.`);
