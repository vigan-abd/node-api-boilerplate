/**
 * @note DO NOT USE THIS HELPER ON CLOUD FUNCTIONS, ONLY ON TESTS 
 */
const commandLineArgs = require('command-line-args');
exports.parse = (usage, options, argv = null) => {
  const parseOpts = argv ? {partial: true, argv} : {partial: true};
  const args = commandLineArgs([
    { name: 'help', alias: 'h', type: Boolean },
  ].concat(options), parseOpts);
  if(args.help) {
    console.log("\x1b[35m%s\x1b[0m", `USAGE >>> ${usage}`);
    process.exit(0);
  }
  args.otherArgs = args._unknown;
  return args;
}