const UserService = require('@services/UserService');


class AuthMiddleware {
  /**
   * @param {UserService} userService 
   */
  constructor(userService) {
    this.userService = userService;

    this.authHandler = this.authHandler.bind(this);
    this.optionalAuthHandler = this.optionalAuthHandler.bind(this);
  }

  /**
   * @param {Request} req
   * @param {Response} res
   * @param {Function} next
   */
  async authHandler(req, res, next) {
    const token = req.get('authorization');

    try {
      const user = await this.userService.verifyAuthToken(token);
      req.currentUser = user;
      next();
    } catch (err) {
      next(err);
    }
  }

  /**
   * @param {Request} req
   * @param {Response} res
   * @param {Function} next
   */
  async optionalAuthHandler(req, res, next) {
    const token = req.get('authorization');
    if (!token) {
      next();
      return;
    }

    try {
      const user = await this.userService.verifyAuthToken(token);
      req.currentUser = user;
      next();
    } catch (err) {
      next(err);
    }
  }
}

module.exports = AuthMiddleware;