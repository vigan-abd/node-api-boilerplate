const EventBase = require('@events/EventBase');

class UserUpdatedEvent extends EventBase {

  /**
   * @param {String} id - User Id
   */
  constructor(id) {
    super();
    this.id = id;

    this.signature = 'user-updated-event';
  }
}

module.exports = UserUpdatedEvent;