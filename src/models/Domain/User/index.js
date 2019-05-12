const Joi = require('joi');

const ModelBase = require('@models/Domain/ModelBase');
const DbQuery = require('./schema');

class User extends ModelBase {

  /**
   * @param {{id: String, username: String, email: String, 
          password: String, tokenHash: String, passwordResetToken: String, passwordResetSentAt: Date,
          created: Date, updated: Date, lastLogin: Date
      }}
   */
  constructor({ id, username, email, password, tokenHash, passwordResetToken, passwordResetSentAt, created, updated, lastLogin }) {
    super();
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.tokenHash = tokenHash;
    this.passwordResetToken = passwordResetToken;
    this.passwordResetSentAt = passwordResetSentAt;
    this.created = created;
    this.updated = updated;
    this.lastLogin = lastLogin;

    this.rules = Joi.object().keys({
      id: Joi.optional().allow(null),
      username: Joi.string().required().min(3),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      tokenHash: Joi.string().required(),
      passwordResetToken: Joi.string().optional().allow(null),
      passwordResetSentAt: Joi.date().optional().allow(null),
      created: Joi.date().optional().allow(null),
      updated: Joi.date().optional().allow(null),
      lastLogin: Joi.date().optional().allow(null),
    });
  }

  asDTO() {
    const user = this.toJSON();
    user.password = null;
    user.tokenHash = null;
    user.passwordResetToken = null;
    user.passwordResetSentAt = null;
    return user;
  }

  static get DbQuery() {
    return DbQuery;
  }

}

module.exports = User;