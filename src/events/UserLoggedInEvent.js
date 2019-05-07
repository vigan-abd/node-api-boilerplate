const EventBase = require('./EventBase');

class UserLoggedInEvent extends EventBase {

  /**
   * @param {String} id - User Id
   */
  constructor(id) {
    super();
    this.id = id;

    this.signature = 'user-logged-in-event';
  }
}

module.exports = UserLoggedInEvent;