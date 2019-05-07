const { expect } = require('chai'); // We use expect to determine case results

// Mockups that we will use
const seed = {
  email: "test@gmail.com",
  password: "abcd1234",
  username: "test"
};
let user = null;

module.exports = (container) => {
  const service = container.resolve('userService'); // Resolve user service that will be used inside test case
  const controller = container.resolve('authenticationAPIController');

  before(async () => {
    // Before running the cases make sure that we clear user collection so we're sure about the expected behavior
    await service.deleteUsers({});
    // Set initial user
    const auth = await service.signup({ body: seed });
    user = await service.getUser(auth.userId);
  });

  it("Test authenticated request case", async () => {
    // Mockup a http request and bypass set currentUser similar to auth middleware
    const { req, res, next } = TestHelper.createExpressMocks({ currentUser: user });

    // Try to execute currentUser action from controller by using our mockup request
    await controller.currentUser(req, res, next);
    const data = JSON.parse(res._getData());
    return expect(data).to.exist;
  });

  it("Test unauthenticated request case", async () => {
    // In case if we didn't passed auth middleware the request wouldn't have currentUser
    const { req, res, next } = TestHelper.createExpressMocks({ });

    // Try to execute currentUser action from controller by using our mockup request
    await controller.currentUser(req, res, next);
    // Expected behavior would be that the controller would call next request due auth failure
    return expect(next.calledOnce).to.be.true;
  });

  after(async () => {
    // Once we finish test cases we clear records from database so it's in clear state again 
    await service.deleteUsers({});
  });
};
