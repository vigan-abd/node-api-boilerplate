// THESE LIBS ARE USED ONLY FOR COLOR PRINTING

exports.debug = function (msg) {
  console.log("\x1b[35m%s\x1b[0m", `DEBUG >>> ${typeof(msg) == "object" ?  JSON.stringify(msg) : msg}`);
};

exports.success = function (msg) {
  console.log("\x1b[32m%s\x1b[0m", `SUCCESS >>> ${typeof(msg) == "object" ?  JSON.stringify(msg) : msg}`);
};

exports.error = function (msg) {
  console.log("\x1b[31m%s\x1b[0m", `ERROR >>> ${typeof(msg) == "object" ?  JSON.stringify(msg) : msg}`);
};