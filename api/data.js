const fs = require('fs');
const path = require('path');

const TMP_FILE = '/tmp/database.json';

// In-memory cache for warm serverless lambdas
let memoryCache = null;

function loadInitialData() {
  try {
    const localDbPath = path.join(process.cwd(), 'data', 'database.json');
    if (fs.existsSync(localDbPath)) {
      return JSON.parse(fs.readFileSync(localDbPath, 'utf8'));
    }
  } catch (e) {
    console.error('Error loading initial data:', e);
  }
  return null;
}

module.exports = (req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // GET: Fetch current data
  if (req.method === 'GET') {
    // 1. Check memory cache
    if (memoryCache) {
      return res.status(200).json({ initialized: true, data: memoryCache, source: 'memory' });
    }

    // 2. Check /tmp filesystem (persists during active lambda lifecycle)
    if (fs.existsSync(TMP_FILE)) {
      try {
        const fileContent = fs.readFileSync(TMP_FILE, 'utf8');
        memoryCache = JSON.parse(fileContent);
        return res.status(200).json({ initialized: true, data: memoryCache, source: 'tmp' });
      } catch (e) {}
    }

    // 3. Fallback to bundled data/database.json
    const initial = loadInitialData();
    if (initial) {
      memoryCache = initial;
      return res.status(200).json({ initialized: true, data: initial, source: 'initial' });
    }

    return res.status(200).json({ initialized: false, data: null });
  }

  // POST: Update data
  if (req.method === 'POST') {
    try {
      let bodyData = req.body;
      if (typeof bodyData === 'string') {
        bodyData = JSON.parse(bodyData);
      }

      memoryCache = bodyData;

      try {
        fs.writeFileSync(TMP_FILE, JSON.stringify(bodyData, null, 2), 'utf8');
      } catch (err) {
        // Even if /tmp fails, memoryCache holds the state
      }

      return res.status(200).json({ success: true, timestamp: Date.now() });
    } catch (e) {
      return res.status(400).json({ error: 'Format JSON tidak valid' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
};

