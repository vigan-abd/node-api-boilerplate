const { expect } = require('chai'); // We use expect to determine case results

// Mockups that we will use
const testUserData = {
  email: "test@gmail.com",
  password: "abcd1234",
  username: "test"
};

module.exports = (container) => {
  const service = container.resolve('userService'); // Resolve user service that will be used inside test case
  const controller = container.resolve('authenticationAPIController');

  before(async () => {
    // Before running the cases make sure that we clear user collection so we're sure about the expected behavior
    await service.deleteUsers({});
    // Set initial user that will be used for login
    await service.signup({ body: testUserData });
  });

  it("Test successfull login with username case", async () => {
    const { email, ...body } = testUserData;
    // Create a mockup request that has body: { username, password } where the values are taken from testUserData
    const { req, res, next } = TestHelper.createExpressMocks({ body });

    // Simulate request by passing mockup to controller
    await controller.signin(req, res, next);
    // Expected behavior would be to get a json response
    const data = JSON.parse(res._getData());
    return expect(data).to.exist;
  });

  it("Test successfull login with email case", async () => {
    // Create a mockup request that has body: { username, password } where the values are taken from testUserData,
    // in this case username has email value
    const { email, ...body } = testUserData;
    body.username = email;
    const { req, res, next } = TestHelper.createExpressMocks({ body });

    // Simulate request by passing mockup to controller
    await controller.signin(req, res, next);
    // Expected behavior would be to get a json response
    const data = JSON.parse(res._getData());
    return expect(data).to.exist;
  });

  it("Test login missign params case", async () => {
    // Create an empty request mockup
    const { req, res, next } = TestHelper.createExpressMocks({ body: {} });

    // Simulate request by passing mockup to controller
    await controller.signin(req, res, next);
    // Expected behavior would be to call the next function inside controller due to failure,
    // With this we assure that error is handled properly
    return expect(next.calledOnce).to.be.true;
  });

  it("Test login invalid password case", async () => {
    const { email, ...body } = testUserData;
    body.password = "12345678";
    const { req, res, next } = TestHelper.createExpressMocks({ body });

    await controller.signin(req, res, next);
    return expect(next.calledOnce).to.be.true;
  });

  it("Test login inexistent user case", async () => {
    const { email, ...body } = testUserData;
    body.username = "notexist";
    const { req, res, next } = TestHelper.createExpressMocks({ body });

    await controller.signin(req, res, next);
    return expect(next.calledOnce).to.be.true;
  });

  after(async () => {
    // Once we finish test cases we clear records from database so it's in clear state again
    await service.deleteUsers({});
  });
};
