const EmitterBase = require('events');
const EventBase = require('@events/EventBase');

class EventDispatcher extends EmitterBase {

}

const emitter = new EventDispatcher();

/**
 * @param {EventBase} event
 */
const dispatch = (event) => emitter.emit(event.signature, event);

/**
 * @param {String} signature 
 * @param {Function} listener 
 */
const listen = (signature, listener) => emitter.addListener(signature, listener);

module.exports = {
  event: dispatch,
  listen
};