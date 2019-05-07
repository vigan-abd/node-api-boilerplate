const cron = require('node-cron');

const register = (container) => {
  const loggerService = container.resolve('loggerService');

  cron.schedule('* * * * *', async () => {
    loggerService.log("info", `Ping from cron job`);
  });
}

module.exports = register;