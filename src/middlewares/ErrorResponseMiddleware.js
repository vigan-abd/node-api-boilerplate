const LoggerService = require('../services/LoggerService');

class ErrorResponseMiddleware {
  /**
   * @param {LoggerService} loggerService 
   */
  constructor(loggerService) {
    this.loggerService = loggerService;

    this.handler = this.handler.bind(this);
  }

  /**
   * @param {any} err
   * @param {Request} req
   * @param {Response} res
   * @param {Function} next
   */
  handler(err, req, res, next) { // Don't remove this 'next'
    let message = "Server error.";
    let status = 500;

    if (err.name == 'ValidationError') {
      status = 422;
      if (err.errors && Object.keys(err.errors).length > 0) {
        let k = Object.keys(err.errors)[0];
        let o = err.errors[k];
        message = o.message;
      }
    } else if (err.name == 'SimpleMessage') {
      message = err.message;
      status = err.status;
    } else if (err.name == 'AuthenticationError') {
      status = 401;
      message = "Authentication error!";
    } else if (err.name == 'UserDefined') {
      if (err.message) message = err.message;
    }

    if (err.statusCode) status = err.statusCode;

    this.loggerService.log('error', err, { tags: 'server' });
    res.statusCode = status;
    
    return res.json({ message });
  }
}

module.exports = ErrorResponseMiddleware;