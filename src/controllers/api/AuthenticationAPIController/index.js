const UserService = require('../../../services/UserService'); // USED ONLY FOR INTELLISENSE ISSUES
const UserLoggedInEvent = require('../../../events/UserLoggedInEvent');
const UserUpdatedEvent = require('../../../events/UserUpdatedEvent');
const event = require('../../../helpers/EventHelper').event;

class AuthenticationAPIController {

  /**
   * @param {UserService} userService 
   */
  constructor(userService) {
    this.userService = userService;

    this.signup = this.signup.bind(this);
    this.signin = this.signin.bind(this);
    this.currentUser = this.currentUser.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
  }

  /**
   * @api {post} /api/v1/auth/signup Signup
   * @apiDescription Used to register as new user
   * @apiName Signup
   * @apiGroup Authentication
   * @apiVersion  0.1.0
   * 
   * @apiParam  {String} email Unique email address for user
   * @apiParam  {String} username Unique username
   * @apiParam  {String} password Password that contains at least a number and minimum length of 8 characters
   * 
   * @apiSuccess (200) {String} token Authorization token that serves as unique identifier for authorized user
   * @apiSuccess (200) {String} userId Unique identifier for user
   * @apiSuccess (200) {Number} expires Token expire time
   * 
   * @apiError {String} error Error message explaining the issue
   * 
   * @apiParamExample  {json} Request-Example:
   * {
   *   "email": "vigan.abd@gmail.com",
   *   "password": "abcd1234",
   *   "username": "vigan"
   * }
   * 
   * @apiSuccessExample Success-Response:
   * HTTP/1.1 200 OK
   * {
   *   "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1YzA3MGUzZWM0ZGU0NDAwY2IxZTBkMTAiLCJpYXQiOjE1NDM5NjYyNzAwMTUsImhhc2giOiI5ZTQ4N2I5OC02NzE4LTRiMTQtYWJmNy00NDMyNDI3ODk0MDQifQ.9VcaYVj8YT0Tgu0ZpP_xjt_5H7Kyco8wSrRdMqfK5X4",
   *   "userId": "5c070e3ec4de4400cb1e0d10",
   *   "expires": 3600
   * }
   * 
   * @apiErrorExample Error-Response:
   * HTTP/1.1 500 Internal Server Error
   * {
   *    "message": "Server Error."
   * }
   * 
   */
  async signup(req, res, next) {
    try {
      const auth = await this.userService.signup(req);
      res.statusCode = 200;
      return res.json(auth);
    } catch (err) {
      next(err);
    }
  }

  /**
   * @api {post} /api/v1/auth/login Login
   * @apiName Login
   * @apiGroup Authentication
   * @apiVersion  0.1.0
   * 
   * @apiParam  {String} username Unique username or email address
   * @apiParam  {String} password Password for the user
   * 
   * @apiSuccess (200) {String} token Authorization token that serves as unique identifier for authorized user
   * @apiSuccess (200) {String} userId Unique identifier for user
   * @apiSuccess (200) {Number} expires Token expire time
   * 
   * @apiError {String} error Error message explaining the issue
   * 
   * @apiParamExample  {json} Request-Example:
   * {
   *   "username": "vigan",
   *   "password": "abcd1234"
   * }
   * 
   * @apiSuccessExample Success-Response:
   * Same as /signup
   * 
   * @apiErrorExample Error-Response:
   * Same as /signup
   * 
   */
  async signin(req, res, next) {
    try {
      const auth = await this.userService.signin(req);
      event(new UserLoggedInEvent(auth.userId));
      res.statusCode = 200;
      return res.json(auth);
    } catch (err) {
      next(err);
    }
  }

  /**
   * @api {get} /api/v1/auth Current User
   * @apiName CurrentUser
   * @apiGroup Authentication
   * @apiVersion  0.1.0
   * 
   * @apiHeader {String} Authorization Authorization token received from /login
   * 
   * @apiSuccess (200) {String} id Unique identifier for user
   * @apiSuccess (200) {String} email Unique email address for user
   * @apiSuccess (200) {String} username Unique username
   * @apiSuccess (200) {String} [password] User password, always null
   * @apiSuccess (200) {String} [tokenHash] User token hash, always null
   * @apiSuccess (200) {String} [passwordResetToken] User password reset token, always null
   * @apiSuccess (200) {String} [passwordResetSentAt] Password reset send date, always null
   * @apiSuccess (200) {String} created Date when the user is registered
   * 
   * @apiError {String} error Error message explaining the issue
   * 
   * @apiHeaderExample {json} Header-Example:
   * {
   *    "Authorization": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1YmFkZDQ1ZWQ0YTRlNDAwZTVhMjI1YjIiLCJpYXQiOjE1MzgxMzY4NTk0MzcsImhhc2giOiIyZjczMDYxZC0zNWQzLTRlMjAtODkzMS05NWZjOTQyMzkxNmMifQ.92knC28UoiYo_4ogkKj2nH6raHOSK4D40TdhfQb87l8"
   * }
   * 
   * @apiSuccessExample Success-Response:
   * HTTP/1.1 200 OK
   * {
   *    "id": "5c070e3ec4de4400cb1e0d10",
   *    "username": "vigan",
   *    "email": "vigan.abd@gmail.com",
   *    "password": null,
   *    "tokenHash": null,
   *    "passwordResetToken": null,
   *    "passwordResetSentAt": null,
   *    "created": "2018-12-04T23:31:10.004Z",
   *    "updated": "2018-12-04T23:31:10.004Z",
   *    "lastLogin": "2018-12-04T23:31:10.004Z"
   * }
   * 
   * @apiErrorExample Error-Response:
   * Same as /signup
   * 
   */
  currentUser(req, res, next) {
    try {
      res.statusCode = 200;
      return res.json(req.currentUser.asDTO());
    } catch (err) {
      next(err);
    }
  }

  /**
   * @api {patch} /api/v1/auth/update-password Update Password
   * @apiName UpdatePassword
   * @apiGroup Authentication
   * @apiVersion  0.1.0
   * 
   * @apiHeader {String} Authorization Authorization token received from /login
   * 
   * @apiParam  {String} password Current password
   * @apiParam  {String} newPassword New password for the user
   * @apiParam  {String} confirmPassword Confirm new password for the user
   * 
   * @apiError {String} error Error message explaining the issue
   * 
   * @apiHeaderExample {json} Header-Example:
   * {
   *    "Authorization": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1YmFkZDQ1ZWQ0YTRlNDAwZTVhMjI1YjIiLCJpYXQiOjE1MzgxMzY4NTk0MzcsImhhc2giOiIyZjczMDYxZC0zNWQzLTRlMjAtODkzMS05NWZjOTQyMzkxNmMifQ.92knC28UoiYo_4ogkKj2nH6raHOSK4D40TdhfQb87l8"
   * }
   * 
   * @apiParamExample  {json} Request-Example:
   * {
   *   "password": "abcd12345",
   *   "newPassword": "abcd1234",
   *   "confirmPassword": "abcd1234"
   * }
   * 
   * @apiSuccessExample Success-Response:
   * Same as /signup
   * 
   * @apiErrorExample Error-Response:
   * Same as /signup
   * 
   */
  async updatePassword(req, res, next) {
    try {
      const auth = await this.userService.updatePassword(req);
      event(new UserUpdatedEvent(auth.userId));
      res.statusCode = 200;
      return res.json(auth);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = AuthenticationAPIController;