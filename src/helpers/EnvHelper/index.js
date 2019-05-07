const env = require('env-var').get;

/**
 * @param {String} key
 * @param {any} defaultValue
 */
module.exports = (key, defaultValue) => env(key, defaultValue).asString();