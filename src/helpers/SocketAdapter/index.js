const fs = require('fs');
const https = require('https');
const config = require('@config');
const socketIO = require('socket.io');

let srv = config.SOCKET_PORT;

if (config.SOCKET_SECURE) {
  const privateKey = fs.readFileSync(`${__dirname}/../../config/certs/privkey.pem`, 'utf8');
  const certificate = fs.readFileSync(`${__dirname}/../../config/certs/fullchain.pem`, 'utf8');
  const credentials = { key: privateKey, cert: certificate };

  srv = https.createServer(credentials).listen(config.SOCKET_PORT);
}

const io = socketIO(srv, {
  path: config.SOCKET_PATH
});

io.clientCount = 0;

module.exports = io;