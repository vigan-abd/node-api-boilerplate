const InterfaceException = require('@models/Business/Exeption/InterfaceException');
const User = require('@models/Domain/User');


class IUserRepository {

  /**
   * 
   * @param {User} model
   * @returns {Promise<User>} 
   */
  async create(model) { 
    throw new InterfaceException('IUserRepository', 'create');
  }

  /**
   * @param {String} id
   * @returns {Promise<User>}
   */
  async findById(id) {
    throw new InterfaceException('IUserRepository', 'findById');
  }

  /**
   * @param {*} conditions
   * @returns {Promise<User[]>}
   */
  async findWhere(conditions) { 
    throw new InterfaceException('IUserRepository', 'findWhere');
  }

  /**
   * @param {Number} page
   * @param {*} conditions
   * @param {*} options
   * @returns {Promise<{
        docs: User[],
        totalDocs: Number,
        limit: Number,
        hasPrevPage: Boolean,
        hasNextPage: Boolean,
        page: Number,
        totalPages: Number,
        prevPage: String?,
        nextPage: String?
      }>}
   */
  async list(page, conditions = {}, options = {}) {
    throw new InterfaceException('IUserRepository', 'list');
  }

  /**
   * 
   * @param {*} conditions
   * @returns {Promise<Number>}
   */
  async count(conditions = null) { 
    throw new InterfaceException('IUserRepository', 'count');
  }

  /**
   * @param {String} id 
   * @param {*} fields 
   * @returns {Promise<User>}
   */
  async update(id, fields) {
    throw new InterfaceException('IUserRepository', 'update');
  }

  /**
   * @param {*} conditions 
   * @returns {Promise<Boolean>}
   */
  async remove(conditions) {
    throw new InterfaceException('IUserRepository', 'remove');
  }
}

module.exports = IUserRepository;