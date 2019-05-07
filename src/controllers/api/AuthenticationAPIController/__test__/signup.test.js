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
  });

  it("Test successfull signup case", async () => {
    // Create a mockup request that has body: { username, password, email } where the values are taken from testUserData
    const { req, res, next } = TestHelper.createExpressMocks({ body: testUserData });

    // Simulate request by passing mockup to controller
    await controller.signup(req, res, next);
    // Expected behavior would be to get a json response
    const data = JSON.parse(res._getData());
    return expect(data).to.exist;
  });

  it("Test signup email/username exists case", async () => {
    // Create a mockup request that has body: { username, password, email } where the values are taken from testUserData
    // In this case the user is expected to exist due to test above
    const { req, res, next } = TestHelper.createExpressMocks({ body: testUserData });

    // Simulate request by passing mockup to controller
    await controller.signup(req, res, next);
    // Expected behavior would be to call the next function inside controller due to failure,
    // With this we assure that error is handled properly
    return expect(next.calledOnce).to.be.true;
  });

  it("Test signup email/username exists case", async () => {
    // Create a mockup request that has body: { username, password, email } where the values are taken from testUserData
    // In this case the user is expected to exist due to test above
    const { req, res, next } = TestHelper.createExpressMocks({ body: testUserData });

    // Simulate request by passing mockup to controller
    await controller.signup(req, res, next);
    // Expected behavior would be to call the next function inside controller due to failure,
    // With this we assure that error is handled properly
    return expect(next.calledOnce).to.be.true;
  });

  it("Test signup missign params case", async () => {
    // Create a mockup request with empty body
    const { req, res, next } = TestHelper.createExpressMocks({ body: {} });

    // Simulate request by passing mockup to controller
    await controller.signup(req, res, next);
    // Expected behavior would be to call the next function inside controller due to failure,
    // With this we assure that error is handled properly
    return expect(next.calledOnce).to.be.true;
  });

  it("Test signup password numbers only case", async () => {
    // Create a mockup request that has password with numbers only
    const { req, res, next } = TestHelper.createExpressMocks({ body: { password: "12345678" } });

    // Simulate request by passing mockup to controller
    await controller.signup(req, res, next);
    // Expected behavior would be to call the next function inside controller due to failure,
    // With this we assure that error is handled properly
    return expect(next.calledOnce).to.be.true;
  });

  it("Test signup password letters only case", async () => {
    // Create a mockup request that has password with letters only
    const { req, res, next } = TestHelper.createExpressMocks({ body: { password: "abcdefgh" } });

    // Simulate request by passing mockup to controller
    await controller.signup(req, res, next);
    // Expected behavior would be to call the next function inside controller due to failure,
    // With this we assure that error is handled properly
    return expect(next.calledOnce).to.be.true;
  });

  it("Test signup password illegal chars case", async () => {
    // Create a mockup request that has password with illegal characters
    const { req, res, next } = TestHelper.createExpressMocks({ body: { password: " 1a  @@@@" } });

    // Simulate request by passing mockup to controller
    await controller.signup(req, res, next);
    // Expected behavior would be to call the next function inside controller due to failure,
    // With this we assure that error is handled properly
    return expect(next.calledOnce).to.be.true;
  });

  it("Test signup password wrong lenght case", async () => {
    // Create a mockup request that has password with smaller length than minimal length
    const { req, res, next } = TestHelper.createExpressMocks({ body: { password: "abcd123" } });

    // Simulate request by passing mockup to controller
    await controller.signup(req, res, next);
    // Expected behavior would be to call the next function inside controller due to failure,
    // With this we assure that error is handled properly
    return expect(next.calledOnce).to.be.true;
  });

  it("Test signup invalid email case", async () => {
    // Create a mockup request that has malformed email
    const { req, res, next } = TestHelper.createExpressMocks({ body: { password: "abcd1234", email: "test", username: "test2" } });

    // Simulate request by passing mockup to controller
    await controller.signup(req, res, next);
    // Expected behavior would be to call the next function inside controller due to failure,
    // With this we assure that error is handled properly
    return expect(next.calledOnce).to.be.true;
  });

  after(async () => {
    // Once we finish test cases we clear records from database so it's in clear state again
    await service.deleteUsers({});
  });
};
