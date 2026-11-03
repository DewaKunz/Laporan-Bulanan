module.exports = (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream; charset=UTF-8');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Access-Control-Allow-Origin', '*');

  res.write('data: {"type":"CONNECTED"}\n\n');

  const interval = setInterval(() => {
    res.write('data: {"type":"PING"}\n\n');
  }, 15000);

  req.on('close', () => {
    clearInterval(interval);
  });
};

