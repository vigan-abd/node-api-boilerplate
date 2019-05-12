const bcrypt = require('bcrypt-nodejs');
const jwt = require('jwt-simple');
const uuid = require('uuid');
const config = require('@config');

class SecurityHelper {
  /**
   * @param {String} id 
   * @param {String} hash
   * @returns {String}
   */
  static encryptJwtToken(id, hash) {
    const jwtKey = config.JWT_SECRET;
    const timestamp = new Date().getTime();

    return jwt.encode({
      sub: id,
      iat: timestamp,
      hash: hash
    }, jwtKey);
  }

  /**
   * @param {String} token 
   * @returns {{sub: String, iat: Number, hash: String}}
   */
  static decryptJwtToken(token) {
    const jwtKey = config.JWT_SECRET;
    try {
      return jwt.decode(token, jwtKey);
    } catch (err) {
      return null;
    }
  }

  /**
   * @param {String} password 
   * @param {String} hash 
   * @returns {Promise<Boolean>} 
   */
  static comparePassword(password, hash) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, hash, (err, res) => {
        if (err) reject(err);
        resolve(res);
      })
    })
  }

  /**
   * @param {String} password
   * @returns {Promise<{password: String, tokenHash: String}>} 
   */
  static hashPassword(password) {
    const saltRounds = 10;

    return new Promise((resolve, reject) => {
      bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) reject(err);
        bcrypt.hash(password, salt, null, (_err, passwordHash) => {
          if (_err) reject(_err);
          const tokenHash = uuid.v4();
          resolve({
            password: passwordHash,
            tokenHash: tokenHash
          });
        })
      })
    })
  }

  static generateCSRFToken() {
    return uuid.v4();
  }

  static checkPasswordPolicy(password) {
    let error;
    if (!(/\d/).test(password))
      error = 'Password must contain a number.';

    if (!(/\w/).test(password))
      error = 'Password must contain a letter.';

    if ((/[^a-zA-Z0-9\_\#\!]/ig).test(password))
      error = 'Password must contain only numbers, letters and the followin chars: _#!';

    if (!password || password.length < 8)
      error = 'Password must be 8 characters.';

    return error;
  }
}

module.exports = SecurityHelper;