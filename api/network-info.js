module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const host = req.headers.host || 'vercel.app';
  const protocol = req.headers['x-forwarded-proto'] || 'https';
  const fullUrl = `${protocol}://${host}`;

  return res.status(200).json({
    ip: 'Vercel Cloud Online ☁️',
    isCloud: true,
    mobileUrl: fullUrl,
    localUrl: fullUrl
  });
};

