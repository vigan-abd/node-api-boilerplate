const dbAdapter = require('../../../helpers/DbAdapter');
const mongoosePaginate = require('mongoose-paginate-v2');
const uuid = require('uuid');

const schema = new dbAdapter.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true, validate: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ },
  password: { type: String, required: true, default: uuid.v4 },
  tokenHash: { type: String, required: true, default: uuid.v4 },
  passwordResetToken: { type: String, required: true, default: uuid.v4 },
  passwordResetSentAt: { type: Date, required: false },
  created: { type: Date, required: true, default: Date.now },
  updated: { type: Date, required: true, default: Date.now },
  lastLogin: { type: Date, required: true, default: Date.now },
});

// Plugins
schema.plugin(mongoosePaginate);

const Schema = dbAdapter.model('User', schema);;

module.exports = Schema;