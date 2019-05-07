class InterfaceException extends Error {
  /**
   * @param {String} className 
   * @param {String} method 
   */
  constructor(className, method) {
    super(`Method ${method} not implemented in class ${className}`);
  }
}

module.exports = InterfaceException;