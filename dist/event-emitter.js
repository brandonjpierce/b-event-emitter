(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define(factory);
	else if(typeof exports === 'object')
		exports["EventEmitter"] = factory();
	else
		root["EventEmitter"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _utils = __webpack_require__(1);

	var utils = _interopRequireWildcard(_utils);

	var EventEmitter = (function () {

	  /**
	   * Construct class and setup listeners and maxListeners
	   *
	   * @method constructor
	   */

	  function EventEmitter() {
	    _classCallCheck(this, EventEmitter);

	    this.listeners = {};
	    this.maxListeners = 10;
	  }

	  _createClass(EventEmitter, [{
	    key: 'setMaxListeners',

	    /**
	     * Setter method for maxListener count
	     *
	     * @method setMaxListeners
	     *
	     * @param {String|Number} val The maximum number of listeners before we warn
	     */
	    value: function setMaxListeners(val) {
	      this.maxListeners = val;
	    }
	  }, {
	    key: 'getMaxListeners',

	    /**
	     * Getter method for maxListener count
	     *
	     * @method getMaxListeners
	     *
	     * @return {Number} The defined max listeners
	     */
	    value: function getMaxListeners() {
	      return this.maxListeners;
	    }
	  }, {
	    key: 'getAllListeners',

	    /**
	     * Getter method for grabbing all listeners for an event name or all of them
	     * globally.
	     *
	     * @method getAllListeners
	     *
	     * @param {String} eventName Specific event name we want to grab listeners for
	     *
	     * @return {Array} Array of listeners
	     */
	    value: function getAllListeners() {
	      var eventName = arguments[0] === undefined ? null : arguments[0];

	      if (eventName) {
	        return this.listeners[eventName] || [];
	      }

	      return this.listeners;
	    }
	  }, {
	    key: 'on',

	    /**
	     * Attach a listener to an event
	     *
	     * @method on
	     *
	     * @param {String} eventName The event name we want to attach our listener to
	     * @param {Function} listener  Listener callback function
	     */
	    value: function on(eventName, listener) {
	      if (!utils.isFunction(listener)) {
	        throw new TypeError('Listener must be a function');
	      }

	      if (!this.listeners[eventName]) {
	        this.listeners[eventName] = [];
	      }

	      var listeners = this.listeners[eventName];
	      listeners.push(listener);

	      if (listeners.length > this.maxListeners) {
	        console.error('Listeners for this event are greater than ' + 'your defined max listeners. Use setMaxListeners() to increase ' + 'limit of listeners.');
	      }
	    }
	  }, {
	    key: 'once',

	    /**
	     * Attach a listener to an event but only fire once
	     *
	     * @method once
	     *
	     * @param {String} eventName The event name we want to attach our listener to
	     * @param {Function} listener  Listener callback function
	     */
	    value: function once(eventName, listener) {
	      if (!utils.isFunction(listener)) {
	        throw new TypeError('Listener must be a function');
	      }

	      function tmp() {
	        this.off(eventName, tmp);
	        listener.apply(this, arguments);
	      }

	      this.on(eventName, tmp);
	    }
	  }, {
	    key: 'off',

	    /**
	     * Remove a listener from an event
	     *
	     * @method off
	     *
	     * @param {String} eventName The event name we want to remove from
	     * @param {Function} listener  Listener callback function we want to remove
	     */
	    value: function off(eventName, listener) {
	      if (!utils.isFunction(listener)) {
	        throw new TypeError('Listener must be a function');
	      }

	      if (!this.listeners[eventName]) {
	        return;
	      }

	      var listeners = this.listeners[eventName];
	      var listenerCount = listeners.length;
	      var position = -1;

	      // perf shortcut
	      if (listenerCount === 1) {
	        this.listeners[eventName] = [];
	      } else {
	        for (var i = 0; i < listenerCount; i++) {
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
	  }, {
	    key: 'emit',

	    /**
	     * Fire event listeners based on event name
	     *
	     * @method emit
	     *
	     * @param {String} eventName Name of event we want to emit
	     * @param {Mixed} ...args Optional arguments we pass to listeners
	     */
	    value: function emit(eventName) {
	      if (!this.listeners[eventName]) {
	        return;
	      }

	      var listeners = this.listeners[eventName];
	      var listenerCount = listeners.length;

	      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	      }

	      // perf shortcut
	      if (listenerCount === 1) {
	        listeners[0].apply(this, args);
	      } else {
	        for (var i = 0; i < listenerCount; i++) {
	          listeners[i].apply(this, args);
	        }
	      }
	    }
	  }]);

	  return EventEmitter;
	})();

	exports['default'] = EventEmitter;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	/**
	 * Determines if passed in value is a function
	 *
	 * @method isFunction
	 *
	 * @param {Mixed} val Value we want to check
	 *
	 * @return {Boolean} Whether the value is a function
	 */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.isFunction = isFunction;
	exports.spliceOne = spliceOne;

	function isFunction(val) {
	  return Object.prototype.toString.call(val) === '[object Function]';
	}

	/**
	 * Taken from io.js source. ~1.5x faster than Array.splice()
	 *
	 * @method spliceOne
	 *
	 * @param {Array} list The array we want to splice
	 * @param {String|Number} index Index we want to splice at
	 *
	 * @return {Array} Mutated array
	 */

	function spliceOne(list, index) {
	  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1) {
	    list[i] = list[k];
	  }

	  list.pop();
	}

/***/ }
/******/ ])
});
;