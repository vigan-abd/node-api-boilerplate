const EventBase = require('./EventBase');

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