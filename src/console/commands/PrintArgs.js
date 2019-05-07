const print = require('../../helpers/PrintHelper');
const arg = require('../../helpers/ArgHelper');

class PrintArgs {
  run (argv) {
    const usage = `./cli -c <command>`
    const options = [
      { name: 'test-arg', alias: 't', type: String }
    ];
    const args = arg.parse(usage, options, argv);
    print.success(args);
  }
}

module.exports = PrintArgs;