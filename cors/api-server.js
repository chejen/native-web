const path = require('path');
const http = require('http');

const PORT = 8087;

http.createServer(function (req, res) {
  if (req.method === 'GET' && req.url === '/data') {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.statusCode = 200;
    const data = {
      message: 'Hello from the Node.js API!',
      timestamp: new Date().toISOString(),
      status: 'success'
    };
    res.end(JSON.stringify(data));
  } else if (req.method === 'POST' && req.url === '/data') {
    let body = ''
    req.on('data', function(chunk) {
      body += chunk.toString();
    });
    req.on('end', function() {
      let rawData = '';
      try {
        rawData = JSON.parse(body);
        console.log({ rawData });
      } catch (error) {
        console.error('Error parsing JSON:', error.message);
      }
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.statusCode = 200;
      const data = {
        rawData,
        message: 'Create successfully',
        timestamp: new Date().toISOString(),
        status: 'success'
      };
      res.end(JSON.stringify(data));
    });
  } else {
    res.writeHead(200);
    res.end('hello world\n');
  }
}).listen(PORT);

console.log(`Server listening on port ${PORT}.`);
