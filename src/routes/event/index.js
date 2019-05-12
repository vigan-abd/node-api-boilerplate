const { listen } = require('@helpers/EventHelper');
const UserLoggedInEvent = require('@events/UserLoggedInEvent');
const UserUpdatedEvent = require('@events/UserUpdatedEvent');

const register = (container) => {
  // SIGNATURES
  const USER_LOGGED_IN_EVENT = new UserLoggedInEvent().signature;
  const USER_UPDATED_EVENT = new UserUpdatedEvent().signature;

  // LISTENERS
  listen(USER_LOGGED_IN_EVENT, container.resolve('UserLoggedInEventListener').handle);
  listen(USER_UPDATED_EVENT, container.resolve('UserUpdatedEventListener').handle);
}

module.exports = register;