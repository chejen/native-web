const fs = require('fs');
const path = require('path');
const https = require('https');

const PORT = 443;
const readFileSyncWithRelativePath =
  filePath => fs.readFileSync(path.resolve(__dirname, filePath));
const options = {
  key: readFileSyncWithRelativePath('cert/example.com+1-key.pem'),
  cert: readFileSyncWithRelativePath('cert/example.com+1.pem'),
};

https
  .createServer(options, (req, res) => {
    if (req.method === 'GET' && req.url === '/api/data') {
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.setHeader('Access-Control-Allow-Origin', 'https://bar.example.com');
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      res.statusCode = 200;
      const data = {
        message: 'Hello from the Node.js API!',
        timestamp: new Date().toISOString(),
        status: 'success'
      };
      res.end(JSON.stringify(data));
    } else if (req.url === '/') {
      res.setHeader('Set-Cookie', 'sample-token=abcd; Domain=.example.com');
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(readFileSyncWithRelativePath('index.html'));
    } else {
      res.writeHead(200);
      res.end('hello world\n');
    }
  })
  .listen(PORT);

console.log(`Server listening on port ${PORT}.`);
