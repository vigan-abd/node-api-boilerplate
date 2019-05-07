/**
 *
 * Event base class, each derived class must override signature method
 * @class EventBase
 */
class EventBase {
  constructor() {
    this.signature = '*';
  }
}

module.exports = EventBase