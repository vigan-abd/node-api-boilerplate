const UserService = require('@services/UserService'); // USED ONLY FOR INTELLISENSE ISSUES

class MainAPIController {

  /**
   * @api {get} /api Main route
   * @apiName MainRoute
   * @apiGroup Main
   * @apiVersion  0.1.0
   * 
   * @apiSuccess (200) {String} msg
   * 
   * @apiError {String} error Error message explaining the issue
   * 
   * @apiSuccessExample Success-Response:
   * HTTP/1.1 200 OK
   * {
   *    "msg": "App is up and running"
   * }
   * 
   * @apiErrorExample Error-Response:
   * HTTP/1.1 500 Internal Server Error
   * {
   *    "message": "Server Error."
   * }
   * 
   */
  index(req, res, next) {
    try {
      res.statusCode = 200;
      return res.json({ "msg": "App is up and running" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = MainAPIController;