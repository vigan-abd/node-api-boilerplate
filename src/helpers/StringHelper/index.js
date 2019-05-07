const dbAdapter = require('../DbAdapter');

class StringHelper {
 
  /**
   * @param {String} id 
   */
  static strToObjectId(id) {
    return dbAdapter.Types.ObjectId(id);
  }
}

module.exports = StringHelper;