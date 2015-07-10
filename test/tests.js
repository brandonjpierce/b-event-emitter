var expect = chai.expect;

/** Stubs */
var stub = null;
function noop() {}

describe('EventEmitter', function() {
  
  beforeEach(function() {
    stub = new EventEmitter();
  });
  
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
    stub.on('test', noop);
    stub.off('test', noop);
    
    expect(stub.listeners.test).to.have.length(0);
  });
  
  it('once() should only fire one time when event is emitted', function() {
    stub.once('foo', noop);
    stub.emit('foo');
    
    expect(stub.listeners.foo).to.have.length(0);
  });
  
  it('getAllListeners() should grab entire listener object when no eventName is passed', function() {
    stub.on('foo', noop);
    stub.on('bar', noop);
    
    var listeners = stub.getAllListeners();
        
    expect(listeners).to.be.a('object');
    expect(listeners).to.include.keys('foo');
    expect(listeners).to.include.keys('bar');
  });
  
  it('getAllListeners(eventName) should grab listeners only for passed in eventName', function() {
    stub.on('foo', noop);
    stub.on('foo', noop);
    
    var listeners = stub.getAllListeners('foo');
        
    expect(listeners).to.be.a('array');
    expect(listeners).to.have.length(2);
  });
  
  it('getAllListeners(eventName) should return an empty array if no listeners are found for specified eventName', function() {
    var listeners = stub.getAllListeners('foo');
    
    expect(listeners).to.be.a('array');
    expect(listeners).to.have.length(0);
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
