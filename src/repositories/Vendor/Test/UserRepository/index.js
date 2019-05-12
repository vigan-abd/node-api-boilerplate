const seed = require('./seed');
const IUserRepository = require('@repositories/Interfaces/IUserRepository');
const UserDefinedException = require("@models/Business/Exeption/UserDefinedException");

const User = require('@models/Domain/User');

const users = seed(); // Generate seeds

/**
 * This class is a mockup UserRepository, it can be used to perform fast calls instead of making calls to db
 * It's mostly useful to speed up testing since we read/write from memory here. 
 * E.g. it can be used in unit tests in service layer
 *
 * @class UserRepository
 * @extends {IUserRepository}
 */
class UserRepository extends IUserRepository {
  // Implement interface
  /**
   * 
   * @param {User} model
   */
  async create(model) {
    // Simulate immediate async
    await Promise.resolve();
    model.id = users.length + 1; // Simulate id generator
    users.push(model);
    return model;
  }

  /**
   * @param {String} id
   */
  async findById(id) {
    // Implement full behavior of real repository
    await Promise.resolve();
    const user = users.find(x => x.id == id);
    if (!user) throw new UserDefinedException("User doesn't exist", 404);
    return user;
  }

  /**
   * @param {*} conditions
   */
  async findWhere(conditions) {
    // Simply return all users
    await Promise.resolve()
    return users;
  }

  /**
   * @param {Number} page
   * @param {*} conditions
   * @param {*} options
   */
  async list(page, conditions = {}, options = {}) {
    // Create exact model as in pagination model
    await Promise.resolve();
    return {
      docs: users,
      totalDocs: users.length,
      limit: users.length,
      hasPrevPage: false,
      hasNextPage: false,
      page: 1,
      totalPages: 1,
      prevPage: null,
      nextPage: null
    }
  }

  /**
   * @param {*} conditions
   */
  async count(conditions = null) {
    // Simulate db count behavior
    await Promise.resolve();
    return users.length;
  }

  /**
   * @param {String} id 
   * @param {*} fields 
   */
  async update(id, fields) {
    // Simulate update against data that is stored in memory
    await Promise.resolve();
    const index = users.findIndex(x => x.id == id);
    if (index < 0) throw new UserDefinedException("User doesn't exist", 404);
    for (const key in fields) {
      users[index][key] = fields[key];
    }
    return users[index];
  }

  /**
   * @param {*} conditions 
   * @returns {Promise<Boolean>}
   */
  async remove(conditions) {
    // Simply remove last item
    await Promise.resolve();
    users.pop();
    return true;
  }

  reset() {
    users = seed();
  }
}

module.exports = UserRepository;