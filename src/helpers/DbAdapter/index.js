const env = require('@helpers/EnvHelper');
const mongoose = require("mongoose");
const config = require('@config');

mongoose.connect(
  config.DB_CONNECTION_STRING, {
    user: env('DB_USERNAME', "root"),
    pass: env('DB_PASSWORD', "root"),
    authSource: env('DB_DATABASE_AUTH', "admin"),
    useNewUrlParser: true
  }
);

module.exports = mongoose;