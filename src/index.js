import * as utils from 'utils';

export default class EventEmitter {
  
  /**
   * Construct class and setup listeners and maxListeners
   *
   * @method constructor
   */
  constructor() {
    this.listeners = {};
    this.maxListeners = 1;
  }
  
  /**
   * Override max listeners
   *
   * @method setMaxListeners
   *
   * @param {String|Number} val The maximum number of listeners before we warn
   */
  setMaxListeners(val) {
    this.maxListeners = val;
  }
  
  /**
   * Simple getter method for maxListener count
   *
   * @method getMaxListeners
   *
   * @return {Number} The defined max listeners
   */
  getMaxListeners() {
    return this.maxListeners;
  }
  
  /**
   * Attach a listener to an event
   *
   * @method on
   *
   * @param {String} eventName The event name we want to attach our listener to
   * @param {Function} listener  Listener callback function
   */
  on(eventName, listener) {
    if (!utils.isFunction(listener)) {
      throw new TypeError('Listener must be a function');
    }
    
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }
    
    let listeners = this.listeners[eventName];
    listeners.push(listener);
        
    if (listeners.length > this.maxListeners) {
      console.error(
        'Listeners for this event are greater than ' +
        'your defined max listeners. Use setMaxListeners() to increase ' +
        'limit of listeners.'
      );
    }
  }
  
  /**
   * Remove a listener from an event
   *
   * @method off
   *
   * @param {String} eventName The event name we want to remove from
   * @param {Function} listener  Listener callback function we want to remove
   */
  off(eventName, listener) {
    if (!utils.isFunction(listener)) {
      throw new TypeError('Listener must be a function');
    }
    
    if (!this.listeners[eventName]) {
      return;
    }
        
    let listeners = this.listeners[eventName];
    let listenerCount = listeners.length;
    let position = -1;
        
    if (listenerCount === 1) {
      this.listeners[eventName] = [];
    } else {
      for (let i = 0; i < listenerCount; i++) {
        if (listeners[i] === listener) {
          position = i;
          break;
        }
      }
      
      if (position < 0) {
        return;
      }
      
      utils.spliceOne(listeners, position);
    }
  }
  
  /**
   * Fire event listeners based on event name
   *
   * @method emit
   *
   * @param {String} eventName Name of event we want to emit
   * @param {Mixed} ...args Optional arguments we pass to listeners
   */
  emit(eventName, ...args) {
    if (!this.listeners[eventName]) {
      return;
    }
    
    let listeners = this.listeners[eventName];
    let listenerCount = listeners.length;
    
    if (listenerCount === 1) {
      listeners[0].apply(this, args);
    } else {
      for (let i = 0; i < listenerCount; i++) {
        listeners[i].apply(this, args);
      }
    }
  }
}
