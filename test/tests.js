function noop() {}

function Stub() {}
Stub.prototype = new EventEmitter();

var expect = chai.expect;
var stub = new Stub();

describe('EventEmitter', function() {
  it('setMaxListeners() should set maxListeners', function() {
    stub.setMaxListeners(5);
    
    expect(stub.getMaxListeners()).to.equal(5);
  });
  
  it('getMaxListeners() should get maxListeners', function() {
    stub.setMaxListeners(15);
    
    expect(stub.getMaxListeners()).to.equal(15);
  });
  
  it('on() should add listener to event', function() {
    stub.on('test', noop);
    
    expect(stub.listeners.test).to.have.length(1);
    expect(stub.listeners.test[0]).to.equal(noop);
  });
  
  it('off() should remove listener from event', function() {
    stub.off('test', noop);
    
    expect(stub.listeners.test).to.have.length(0);
  });
  
  it('once() should only fire one time when event is emitted', function() {
    stub.once('foo', noop);
    stub.emit('foo');
    
    expect(stub.listeners.foo).to.have.length(0);
  });
  
  it('should throw TypeError if a function is not passed for a listener', function() {
    expect(function() {
      stub.on('foo', 'bar');
    }).to.throw(TypeError);
    
    expect(function() {
      stub.off('foo', 'bar');
    }).to.throw(TypeError);
  });
});
