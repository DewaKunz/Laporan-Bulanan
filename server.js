const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const PORT = process.env.PORT || 3000;
const DB_FILE = path.join(__dirname, 'data', 'database.json');

// List of connected SSE clients for instant 0-delay push
let sseClients = [];

function getLocalIpAddresses() {
  const interfaces = os.networkInterfaces();
  const addresses = [];
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        addresses.push(iface.address);
      }
    }
  }
  return addresses;
}

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = req.url.split('?')[0];

  // API 1: Network info
  if (parsedUrl === '/api/network-info' && req.method === 'GET') {
    const ips = getLocalIpAddresses();
    const primaryIp = ips[0] || 'localhost';
    res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
    res.end(JSON.stringify({
      ip: primaryIp,
      ips: ips,
      port: PORT,
      mobileUrl: `http://${primaryIp}:${PORT}`,
      localUrl: `http://localhost:${PORT}`
    }));
    return;
  }

  // API 2: Server-Sent Events (SSE) Stream for Zero-Delay Realtime Updates
  if (parsedUrl === '/api/stream' && req.method === 'GET') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream; charset=UTF-8',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*'
    });
    res.write('data: {"type":"CONNECTED"}\n\n');
    sseClients.push(res);

    req.on('close', () => {
      sseClients = sseClients.filter(c => c !== res);
    });
    return;
  }

  // API 3: Data retrieval (GET /api/data)
  if (parsedUrl === '/api/data' && req.method === 'GET') {
    fs.readFile(DB_FILE, 'utf8', (err, data) => {
      const headers = {
        'Content-Type': 'application/json; charset=UTF-8',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      };
      if (err) {
        if (err.code === 'ENOENT') {
          res.writeHead(200, headers);
          res.end(JSON.stringify({ initialized: false, data: null }));
        } else {
          res.writeHead(500, headers);
          res.end(JSON.stringify({ error: err.message }));
        }
      } else {
        res.writeHead(200, headers);
        res.end(JSON.stringify({ initialized: true, data: JSON.parse(data) }));
      }
    });
    return;
  }

  // API 4: Data update (POST /api/data)
  if (parsedUrl === '/api/data' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const parsed = JSON.parse(body);
        const dataDir = path.dirname(DB_FILE);
        if (!fs.existsSync(dataDir)) {
          fs.mkdirSync(dataDir, { recursive: true });
        }
        fs.writeFile(DB_FILE, JSON.stringify(parsed, null, 2), 'utf8', (err) => {
          if (err) {
            res.writeHead(500, { 'Content-Type': 'application/json; charset=UTF-8' });
            res.end(JSON.stringify({ error: err.message }));
          } else {
            res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
            res.end(JSON.stringify({ success: true, timestamp: Date.now() }));

            // Broadcast instantly to all connected SSE clients without delay!
            sseClients.forEach(client => {
              try {
                client.write(`data: ${JSON.stringify({ type: 'UPDATE', data: parsed })}\n\n`);
              } catch (e) {}
            });
          }
        });
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json; charset=UTF-8' });
        res.end(JSON.stringify({ error: 'Invalid JSON format' }));
      }
    });
    return;
  }

  // Static File Serving
  let targetPath = parsedUrl === '/' ? '/index.html' : parsedUrl;
  const filePath = path.join(__dirname, targetPath);
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
        res.end('404 Not Found');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=UTF-8' });
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

server.listen(PORT, '0.0.0.0', () => {
  const localIps = getLocalIpAddresses();
  const primaryIp = localIps[0] || 'localhost';

  console.log(`\n=============================================================`);
  console.log(`🌸 DEWA & AYU SWEET SPACE - REALTIME ONLINE!`);
  console.log(`=============================================================`);
  console.log(`💻 Buka di Laptop:`);
  console.log(`   👉 http://localhost:${PORT}`);
  console.log(``);
  console.log(`📱 Buka di HP Dewa atau HP Ayu (di jaringan Wi-Fi yang sama):`);
  console.log(`   👉 http://${primaryIp}:${PORT}`);
  console.log(`=============================================================\n`);
});
