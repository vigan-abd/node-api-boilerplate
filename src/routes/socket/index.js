const io = require('@helpers/SocketAdapter');

const register = (container) => {
  const loggerService = container.resolve('loggerService');

  io.on('connect', socket => {
    io.clientCount++;
    loggerService.log("info", `Client #${socket.id} connected, total connections: ${io.clientCount}`);

    socket.on('disconnect', () => {
      io.clientCount--;
      loggerService.log("info", `Client #${socket.id} disconnected, total connections: ${io.clientCount}`);
    });
  });
}

module.exports = register;