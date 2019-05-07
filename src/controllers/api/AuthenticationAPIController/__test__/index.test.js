/**
 * This file loads/runs all the tests inside current directory and passes dependency injection container to them.
 * It also passes prefix: "-- AuthenticationAPIController#", so all files are described with same prefix, e.g. "-- AuthenticationAPIController#currentUser"
 */

module.exports = (container) => {
  TestHelper.executeTestsInDir(__dirname, container, "-- AuthenticationAPIController#");  
}
