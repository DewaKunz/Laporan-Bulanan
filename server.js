const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const PORT = process.env.PORT || 3000;
const DB_FILE = path.join(__dirname, 'data', 'database.json');

// Helper to get local Wi-Fi / LAN IP addresses
function getLocalIpAddresses() {
  const interfaces = os.networkInterfaces();
  const addresses = [];
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      // Filter out internal (i.e. 127.0.0.1) and non-ipv4
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
  // CORS Headers so local network devices (HP, tablet, laptop) can connect seamlessly
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = req.url.split('?')[0];

  // API 1: Network info (for mobile QR Code & direct links)
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

  // API 2: Data retrieval (GET /api/data)
  if (parsedUrl === '/api/data' && req.method === 'GET') {
    fs.readFile(DB_FILE, 'utf8', (err, data) => {
      if (err) {
        if (err.code === 'ENOENT') {
          // If database doesn't exist yet, return null
          res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
          res.end(JSON.stringify({ initialized: false, data: null }));
        } else {
          res.writeHead(500, { 'Content-Type': 'application/json; charset=UTF-8' });
          res.end(JSON.stringify({ error: err.message }));
        }
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
        res.end(JSON.stringify({ initialized: true, data: JSON.parse(data) }));
      }
    });
    return;
  }

  // API 3: Data update (POST /api/data)
  if (parsedUrl === '/api/data' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const parsed = JSON.parse(body);
        // Ensure data dir exists
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

// Bind to 0.0.0.0 so all devices in local Wi-Fi (phone & laptop) can access it
server.listen(PORT, '0.0.0.0', () => {
  const localIps = getLocalIpAddresses();
  const primaryIp = localIps[0] || 'localhost';

  console.log(`\n=============================================================`);
  console.log(`💑 DASHBOARD DEWA & AYU BERJALAN!`);
  console.log(`=============================================================`);
  console.log(`💻 Buka di Laptop:`);
  console.log(`   👉 http://localhost:${PORT}`);
  console.log(``);
  console.log(`📱 Buka di HP Dewa atau HP Ayu (di jaringan Wi-Fi yang sama):`);
  console.log(`   👉 http://${primaryIp}:${PORT}`);
  console.log(`=============================================================\n`);
});
