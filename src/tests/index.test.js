const container = require('../containers/test'); // Load awilix container for test environment
const dbAdapter = require('../helpers/DbAdapter');
const TestHelper = require('../helpers/TestHelper');

global.TestHelper = TestHelper; // Make TestHelper globally available for all tests so we don't need to require it manually

// Initialization point
before(() => {
  console.log("*** Starting tests! ***");
});


// Tests

// Unit tests
describe("*** Unit testing! ***", () => {
  // Specify folders inside src/repositories dir that we want to load
  const repositories = [
    "Vendor/MongoDb/UserRepository",
  ];

  // For each repository get the index file and run tests on it, 
  // other tests will be resolved inside index file automatically via TestHelper.executeTestsInDir
  repositories.forEach(r => TestHelper.importTest(
    `${r} tests`, // Description, e.g.Vendor/MongoDb/UserRepository tests
    `${__dirname}/../repositories/${r}/__test__/index.test`, // path to index file for tests in repository
    container // Inject container
  ));

  // Specify folders inside src/services dir that we want to load 
  const services = [
    "UserService",
  ];

  // For each service get the index file and run tests on it, 
  // other tests will be resolved inside index file automatically via TestHelper.executeTestsInDir
  services.forEach(s => TestHelper.importTest(
    `${s} tests`, // Description, e.g.UserService tests
    `${__dirname}/../services/${s}/__test__/index.test`, // path to index file for tests in service
    container // Inject container
  ));
});


// Integration tests
describe("*** Integration testing! ***", () => {
  // Specify folders inside src/controllers/api dir that we want to load
  const controllers = [
    'AuthenticationAPIController',
  ];

  // For each controller get the index file and run tests on it, 
  // other tests will be resolved inside index file automatically via TestHelper.executeTestsInDir
  controllers.forEach(c => TestHelper.importTest(
    `${c} tests`, // Description, e.g.UserAPIController tests
    `${__dirname}/../controllers/api/${c}/__test__/index.test`, // path to index file for tests in controller
    container // Inject container
  ));
});


// Destruction point
after(() => {
  console.log("*** Tests ended, disposing resources! ***");
  // Once we end tests we release db resource and destroy awilix container
  container.dispose();
  dbAdapter.disconnect();
});