const dbAdapter = require('@helpers/DbAdapter');

class StringHelper {
 
  /**
   * @param {String} id 
   */
  static strToObjectId(id) {
    return dbAdapter.Types.ObjectId(id);
  }
}

module.exports = StringHelper;