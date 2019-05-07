const { expect } = require('chai'); // We use expect to determine case results
const User = require('../../../../../models/Domain/User');
const UserRepository = require('../index');

module.exports = (container) => {
  const repository = new UserRepository();

  before(async () => {
    // Clear all users so we're sure that it won't fail due to existing users
    await repository.remove({});
  });

  it("Test success create case", async () => {
    // Perform create method from vendor repository
    const user = await repository.create(new User({
      username: "test",
      email: "test@mail.com",
      password: "asfohasohuioedshuthetes9ydgnsdbngi"
    }));

    // We expect to get a user that has id
    return expect(user.id).to.exist;
  });

  after(async () => {
    // Clear user once we finish tests
    await repository.remove({});
  });
};
