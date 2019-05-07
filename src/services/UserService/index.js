const IUserRepository = require('../../repositories/Interfaces/IUserRepository');
const UserDefinedException = require('../../models/Business/Exeption/UserDefinedException');
const User = require('../../models/Domain/User');
const SecurityHelper = require('../../helpers/SecurityHelper');
const StringHelper = require('../../helpers/StringHelper');
const config = require('../../config');


class UserService {
  /**
   * @param {IUserRepository} iuserRepository 
   */
  constructor(iuserRepository) {
    this.iuserRepository = iuserRepository;
  }

  /**
   * @param {User} user 
   */
  authResponse(user) {
    const token = SecurityHelper.encryptJwtToken(user.id, user.tokenHash);

    return {
      token,
      userId: user.id,
      expires: parseInt(config.JWT_EXPIRE_TIME)
    };
  }

  /**
   * @param {String} token 
   */
  async verifyAuthToken(token) {
    const decryptedToken = SecurityHelper.decryptJwtToken(token);
    if (!decryptedToken) throw new UserDefinedException("Authorization missing.", 401);
    if (!decryptedToken.sub) throw new UserDefinedException("Authorization missing.", 401);
    if (new Date().getTime() - decryptedToken.iat > (config.JWT_EXPIRE_TIME * 1000))
      throw new UserDefinedException("Your session has expired! Please sign-in again.", 401);

    const user = await this.iuserRepository.findById(decryptedToken.sub);
    if (!user)
      throw new UserDefinedException("Your user does not exist .", 401);

    if (user.tokenHash != decryptedToken.hash)
      throw new UserDefinedException("Your session has expired! Please sign-in again.", 401);
    return user;
  }

  /**
   * @param {Request} req 
   */
  async signup(req) {
    const email = req.body.email ? req.body.email.toLowerCase() : null;
    const username = req.body.username ? req.body.username.toLowerCase() : null;
    const password = req.body.password || null;

    const passwordError = SecurityHelper.checkPasswordPolicy(password);
    if (passwordError)
      throw new UserDefinedException(passwordError, 422);

    const count = await this.iuserRepository.count({ $or: [{ email }, { username }] });
    if (count > 0)
      throw new UserDefinedException("Email or username is in use.", 409);

    const pass = await SecurityHelper.hashPassword(password);
    const model = new User({
      username: username,
      email: email,
      password: pass.password,
      tokenHash: pass.tokenHash,
    });

    const { error } = model.validate();
    if (error)
      throw new UserDefinedException(error.message, 422);

    const user = await this.iuserRepository.create(
      new User({
        username: username,
        email: email,
        password: pass.password,
        tokenHash: pass.tokenHash,
      }));
    return this.authResponse(user);
  }

  /**
   * @param {Request} req 
   */
  async signin(req) {
    const username = req.body.username || null;
    const password = req.body.password || null;

    if (!username || !password)
      throw new UserDefinedException("Email and password are required!", 404);

    let user;

    const users = await this.iuserRepository.findWhere({ $or: [{ username }, { email: username }] });
    if (users.length != 1)
      throw new UserDefinedException("Incorrect email or password.", 401);
    user = users[0];

    const isMatch = await SecurityHelper.comparePassword(password, user.password);
    if (!isMatch)
      throw new UserDefinedException("Incorrect email or password", 401);

    return this.authResponse(user);
  }

  /**
   * @param {Request} req 
   */
  async updatePassword(req) {
    const password = req.body.password || null; // CURRENT PASSWORD
    const newPassword = req.body.newPassword || null;
    const confirmPassword = req.body.confirmPassword || null;

    if (!newPassword || !confirmPassword || !password)
      throw new UserDefinedException("Fields password, newPassword, and confirmPassword are required!", 422);

    if (newPassword !== confirmPassword)
      throw new UserDefinedException("New password and confirmed new password mismatch", 422);

    const user = req.currentUser;

    const isMatch = await SecurityHelper.comparePassword(password, user.password);
    if (!isMatch)
      throw new UserDefinedException("Password mismatch!", 401);

    const passwordError = SecurityHelper.checkPasswordPolicy(newPassword);
    if (passwordError)
      throw new UserDefinedException(passwordError, 422);

    const pass = await SecurityHelper.hashPassword(newPassword);
    const res = await this.iuserRepository.update(user.id, pass);
    return this.authResponse(res);
  }

  /**
   * @param {String} userId 
   */
  getUser(userId) {
    return this.iuserRepository.findById(userId);
  }

  /**
   * @param {*} conditions 
   */
  deleteUsers(conditions) {
    return this.iuserRepository.remove(conditions);
  }

  /**
   * @param {String} id
   * @param {{updated?: Date, lastLogin?: Date}} fields 
   */
  updateStamps(id, fields) {
    const stamps = {};
    if (fields.updated) stamps['updated'] = fields.updated;
    if (fields.lastLogin) stamps['lastLogin'] = fields.lastLogin;
    return this.iuserRepository.update(id, stamps);
  }
}

module.exports = UserService;