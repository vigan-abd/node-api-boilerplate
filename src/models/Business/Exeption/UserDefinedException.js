class UserDefinedException {
  constructor(message, statusCode) {
    this.message = message;
    this.statusCode = statusCode;
    this.name = 'UserDefined';
  }
}

module.exports = UserDefinedException;