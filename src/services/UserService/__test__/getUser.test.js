const { expect } = require('chai'); // We use expect to determine case results
const UserRepository = require('../../../repositories/Vendor/Test/UserRepository');

module.exports = (container) => {
  const service = container.resolve('userService');
  const repository = container.resolve('iuserRepository');

  before(() => {
    // Replace real repository with mockup repository so we speed up testing
    // Real repository performs calls against db, mockup against memory so it's faster and our focus is in service behavior,
    // not repository behavior
    service.iuserRepository = new UserRepository();
  })

  it("Test success getUser case", async () => {
    // Test case when we get existing user (see seed.js in repository/Vendor/Test/UserRepository) for dataset
    const user = await service.getUser("5c085c669b12c7002a8321eb");
    return expect(user.id).to.exist;
  });

  after(() => {
    // Replace repository mockup with real one once we finish
    service.iuserRepository = repository;
  });
};
