const fs = require('fs');
const path = require('path');
const httpMocks = require('node-mocks-http');
const sinon = require('sinon');
const EventEmitter = require('events').EventEmitter;

/**
 * This class is used for loading test files and creating mockups
 */
class TestHelper {
  /**
   * This method simulates a http request or middleware behavior, it's mostly useful when we test controllers (integration tests) 
   */
  static createExpressMocks(reqOptions = {}, resOptions = {}, next) {
    resOptions.eventEmitter = EventEmitter;
    const { req, res } = httpMocks.createMocks(reqOptions, resOptions);

    return {
      req,
      res,
      next: (sinon.spy() || next)
    };
  }

  /**
   * This method is used to execute tests inside a file. We pass the test case description from outside, 
   * the filepath from where we want to load tests, 
   * and options or arguments that we pass to test functions that will be executed.
   * @param {String} name test case description
   * @param {String} path file path
   * @param {*} opts options or arguments passed from outside to test method, e.g. dependency injection container
   */
  static importTest(name, path, opts) {
    describe(name, () => {
      const test = require(path);
      if (opts && typeof test === "function") test(opts);
    });
  };

  /**
   * This method performs importTest for all files inside a directory except index.test.js
   * @param {String} dirname Directory from where we want to executed test files
   * @param {*} opts options or arguments passed from outside to test method, e.g. dependency injection container
   * @param {String} prefix Test case description prefix, e.g. User Service tests# 
   */
  static executeTestsInDir(dirname, opts, prefix = "") {
    const files = fs.readdirSync(dirname);
    files.forEach(file => {
      if (file !== 'index.test.js') {
        TestHelper.importTest(
          `${prefix}${file.replace(".test.js", "")}`,
          path.join(dirname, file),
          opts
        );
      }
    });
  }
}

module.exports = TestHelper
