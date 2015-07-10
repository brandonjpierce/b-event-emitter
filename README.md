# Smelly Event Emitter

A minimal and fast event-emitter for the browser. This can be used as a standalone class or attached to an existing objects prototype. See usage example below.

### Installation

npm
```bash
npm install smelly-event-emitter --save
```
browser
```html
<script src="/source/to/event-emitter.min.js"></script>
```

### Usage

commonjs environment with inheritance (ES6)
```javascript
import EventEmitter from 'event-emitter';

class Foo extends EventEmitter {
  constructor() {
    super();
    
    this.on('foo', this.bar);
    this.emit('foo');
  }
  
  bar() {
    console.log('foo event emitted!');
  }
}
```

commonjs environment with inheritance (ES5)
```javascript
var EventEmitter = require('smelly-event-emitter');

function Foo() {
  EventEmitter.call(this); // super
  
  this.on('foo', this.bar);
}

Foo.prototype.bar = function() {
  console.log('foo event emitted');
}

Foo.prototype = Object.create(EventEmitter.prototype);
Foo.prototype.constructor = Foo;

var test = new Foo();
test.emit('foo');
```

browser environment with inheritance
```javascript
function Foo() {
  EventEmitter.call(this); // super
  
  this.on('foo', this.bar);
}

Foo.prototype.bar = function() {
  console.log('foo event emitted');
}

Foo.prototype = Object.create(EventEmitter.prototype);
Foo.prototype.constructor = Foo;

var test = new Foo();
foo.emit('foo');
```
standalone (commonjs ES6)
```javascript
import EventEmitter from 'event-emitter';

const ee = new EventEmitter();

class Foo {
  constructor() {
    ee.on('foo', this.bar);
    ee.emit('foo');
  }
  
  bar() {
    console.log('foo event called');
  }
}
```

### API

#### `.on(eventName, listener)`

Attaches a listener to an event name. The listener can be removed by calling `.off(eventName, listener)`. Note that if you pass an anonymous function as the lister, the `.off()` method will not be able to correctly remove that listener from the event listener list.

#### `.off(eventName, listener)`

Removes a listener from an event name. The listener will only correctly be removed if it is a named function (with the exception of if there is only a single listener attached).

#### `.once(eventName, listener)`

Attaches a listener to an event name that will only be fired once and then removed after being fired.

#### `.emit(eventName, ...args)`

Fire off all listeners for a specified event name and pass in any params to them as well. You can pass in any number of arguments you want e.g. `this.emit('foo', 'bar', 'baz', 'boz')` or `this.emit('foo', { bar: 'baz' })`. Note, a listener must have been attached with `.on()` or `.once()` before it can be fired with `.emit()`.

#### `.getMaxListeners()`

Gets the specified maxListener count for the EventEmitter. Note this is used only to warn you against attaching too many listeners at once to a single event name.

#### `.setMaxListeners()`

Sets the maxListener count for the EventEmitter.


#### `.getAllListeners(eventName = null)`

Grabs all listeners for a specific event name, or if none is provided simply grabs the entire EventEmitter listeners object.
