import http from 'http';
import fs from 'fs';
import path from 'path';

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

const server = http.createServer((req, res) => {
  let { url } = req;
  const basePath = __dirname;
  
  if (!path.extname(url)) {
    url += '.json';
  }

  const filePath = path.join(basePath, url);

  console.log(filePath); 

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('File not found');
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(data);
    }
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
