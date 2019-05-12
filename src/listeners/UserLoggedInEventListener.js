const ListenerBase = require('@listeners/ListenerBase');
const UserLoggedInEvent = require('@events/UserLoggedInEvent');
const UserService = require('@services/UserService');
const LoggerService = require('@services/LoggerService');

const { APP_ENV } = require('@config');

class UserLoggedInEventListener extends ListenerBase {
  /**
   * 
   * @param {UserService} userService 
   * @param {LoggerService} loggerService
   */
  constructor(userService, loggerService) {
    super();
    this.userService = userService;
    this.loggerService = loggerService;

    this.handle = this.handle.bind(this);
  }

  /**
   * @param {UserLoggedInEvent} event
   */
  async handle(event) {
    if (APP_ENV == 'test') return;

    try {
      const now = new Date();
      await this.userService.updateStamps(event.id, {
        updated: now, lastLogin: now
      });
    } catch (ex) {
      this.loggerService.log('error', ex, { tags: 'network,remote' });
    }
  }
}

module.exports = UserLoggedInEventListener;