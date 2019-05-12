/**
 * For each environment we have different configuration, e.g. for console commands we can use cli.env, for testing test.env. 
 * All of these files are resolved as environment variables via 'node-env-file' package which loads the content of files
 * into environment variables. All it takes is NODE_ENV environment variable to resolve the file and load entire config. 
 * E.g. NODE_ENV=test ./node_modules/.bin/mocha ./src/tests/index.test.js loads test.env file config. We also have a helper method
 * env which tries to load an environment variable based on key, and provides a default value if the variable doesn't exist. E.g
 * env('JWT_EXPIRE_TIME', 3600) tries to load environment variable process.env.JWT_EXPIRE_TIME and provides a default value 3600
 * if it misses.
 */

const envFile = require('node-env-file');
const path = require('path');
const env = require('@helpers/EnvHelper');

try {
  envFile(path.join(__dirname, process.env.NODE_ENV + '.env'));
} catch (e) {
  console.log(`No config file found for ${process.env.NODE_ENV}`);
}

const APP_ENV = env('APP_ENV', process.env.NODE_ENV || 'development');
const HOST = env('HOST', '0.0.0.0');

const config = {
  // ENV
  APP_NAME: env('APP_NAME', 'Node JS'),
  APP_ENV: APP_ENV,
  APP_DEBUG: env('APP_DEBUG', true),
  PORT: env('PORT', process.env.PORT || '4001'),
  HOST: HOST,
  ROOT: `${__dirname}/..`,

  // SECURITY
  JWT_SECRET: env('JWT_SECRET', 'notsosecure'),
  JWT_EXPIRE_TIME: env('JWT_EXPIRE_TIME', 3600), //seconds

  // REQUEST
  REQ_PAYLOAD_LIMIT: env('REQ_PAYLOAD_LIMIT', '50mb'),

  // DB
  DB_CONNECTION_STRING: `mongodb://${env('DB_HOST', '127.0.0.1')}:${env('DB_PORT', 27017)}/${env('DB_DATABASE', "admin")}`,

  // SOCKET
  SOCKET_PORT: env('SOCKET_PORT', 4002),
  SOCKET_PATH: env('SOCKET_PATH', '/io'),
  SOCKET_SECURE: env('SOCKET_SECURE', null) == 'true',

  // LOG
  LOG_LEVEL: env('LOG_LEVEL', 'silly'),
  LOG_GROUP_NAME: env('LOG_GROUP_NAME', 'node-app'),

  // CLOUDWATCH
  CLOUDWATCH_REGION: env('CLOUDWATCH_REGION', 'ap-southeast-2'),
  CLOUDWATCH_ACCESS_KEY_ID: env('CLOUDWATCH_ACCESS_KEY_ID', ''),
  CLOUDWATCH_SECRET_ACCESS_KEY: env('CLOUDWATCH_SECRET_ACCESS_KEY', ''),
};


module.exports = config;