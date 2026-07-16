const https = require('https');
https.get('https://codepen.io/GreenSock/pen/ExEOeJQ.js', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => console.log(data.substring(0, 1000)));
});
