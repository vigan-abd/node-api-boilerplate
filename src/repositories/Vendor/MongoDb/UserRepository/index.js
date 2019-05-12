const IUserRepository = require('@repositories/Interfaces/IUserRepository');
const User = require('@models/Domain/User');

class UserRepository extends IUserRepository {
  parseRecord(raw) {
    return new User({
      id: raw._id || null, username: raw.username || null, email: raw.email || null,
      password: raw.password || null, tokenHash: raw.tokenHash || null,
      passwordResetToken: raw.passwordResetToken || null, passwordResetSentAt: raw.passwordResetSentAt || null,
      created: raw.created || null, updated: raw.updated || null, lastLogin: raw.lastLogin || null
    });
  }

  /**
   * 
   * @param {User} model
   * @returns {Promise<User>} 
   */
  async create(model) {
    const res = await User.DbQuery.create(model.toJSON());
    return this.parseRecord(res);
  }

  /**
   * @param {String} id
   * @returns {Promise<User>}
   */
  async findById(id) {
    const res = await User.DbQuery.findById(id);
    return this.parseRecord(res);
  }

  /**
   * @param {*} conditions
   * @returns {Promise<User[]>}
   */
  async findWhere(conditions) {
    const res = await User.DbQuery.find(conditions);
    return res.map(raw => this.parseRecord(raw));
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
    options.page = page;
    const res = await User.DbQuery.paginate(conditions, options);

    for (let i = 0; i < res.docs.length; i++) {
      res.docs[i].id = res.docs[i]._id;
      res.docs[i] = new User(res.docs[i]);
    }
    res.page = parseInt(res.page);
    res.prevPage ? res.prevPage = parseInt(res.prevPage) : null;
    res.nextPage ? res.nextPage = parseInt(res.nextPage) : null;

    return res;
  }

  /**
   * @param {*} conditions
   */
  async count(conditions = null) {
    return await User.DbQuery.count(conditions || {});
  }

  /**
   * @param {String} id 
   * @param {*} fields 
   * @returns {Promise<User>}
   */
  async update(id, fields) {
    await User.DbQuery.findByIdAndUpdate(id, fields);
    return await this.findById(id);
  }

  /**
   * @param {*} conditions 
   * @returns {Promise<Boolean>}
   */
  async remove(conditions) {
    await User.DbQuery.deleteMany(conditions);
    return true;
  }

  query() {
    return User.DbQuery;
  }
}

module.exports = UserRepository;