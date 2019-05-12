const container = require('@containers/cli');
const arg = require('@helpers/ArgHelper');
const print = require('@helpers/PrintHelper');
const routes = require('@routes/console')(container);

module.exports = () => {
  // CONFIG
  const usage = `./cli -c <command>`
  const options = [
    { name: 'command', alias: 'c', type: String }
  ];

  const args = arg.parse(usage, options);

  if (!args.command) {
    print.error(`Usage: ${usage}`);
    process.exit(1);
  }

  const { command, otherArgs } = args;

  if (!Object.keys(routes).includes(command)) {
    print.error(`Command ${command} is not supported!`);
    process.exit(1);
  }

  print.debug(`Running command: ${command}`);

  routes[command](otherArgs);
  container.dispose();
}
