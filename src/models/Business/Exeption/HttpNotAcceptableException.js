class HttpNotAcceptableException extends Error {
  constructor(acceptType) {
    super(`${acceptType} is/are not supported by http endpoint`);
    this.code = 406;
  }
}

module.exports = HttpNotAcceptableException;