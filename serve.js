const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.txt': 'text/plain; charset=utf-8'
};

const server = http.createServer((req, res) => {
  try {
    const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    let decodedPath = decodeURIComponent(parsedUrl.pathname);

    // Built-in fallback for favicon.ico
    if (decodedPath === '/favicon.ico' && !fs.existsSync(path.join(__dirname, 'favicon.ico'))) {
      if (fs.existsSync(path.join(__dirname, 'favicon.svg'))) {
        const svg = fs.readFileSync(path.join(__dirname, 'favicon.svg'));
        res.writeHead(200, { 'Content-Type': 'image/svg+xml' });
        res.end(svg);
        return;
      }
      res.writeHead(204);
      res.end();
      return;
    }

    // Strip leading slashes and default to index.html
    const relPath = decodedPath.replace(/^[\/\\]+/, '') || 'index.html';
    let filePath = path.resolve(__dirname, relPath);

    // Prevent directory traversal
    if (!filePath.startsWith(__dirname)) {
      res.writeHead(403, { 'Content-Type': 'text/plain' });
      res.end('403 Forbidden');
      return;
    }

    // Check file stats
    fs.stat(filePath, (err, stats) => {
      if (err) {
        if (err.code === 'ENOENT') {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('404 Not Found');
        } else {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end(`Server Error: ${err.code}`);
        }
        return;
      }

      if (stats.isDirectory()) {
        filePath = path.join(filePath, 'index.html');
      }

      const extname = String(path.extname(filePath)).toLowerCase();
      const contentType = MIME_TYPES[extname] || 'application/octet-stream';

      fs.readFile(filePath, (readErr, content) => {
        if (readErr) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end(`Server Error: ${readErr.code}`);
          return;
        }
        res.writeHead(200, {
          'Content-Type': contentType,
          'Content-Length': content.length,
          'Cache-Control': 'no-cache'
        });
        res.end(content);
      });
    });
  } catch (err) {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.end('Bad Request');
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use.`);
  } else {
    console.error(`Server error:`, err);
  }
});
