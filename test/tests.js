function noop() {}
function argumentsFunc(arg1, arg2, arg3) {}

function Stub() {}
Stub.prototype = new EventEmitter();

var expect = chai.expect;
var stub = new Stub();

describe('EventEmitter', function() {
  it('should set maxListeners', function() {
    stub.setMaxListeners(15);
    
    expect(stub.getMaxListeners()).to.equal(15);
  });
  
  it('should add an event to intenral listeners object', function() {
    stub.on('test', noop);
    
    expect(stub.listeners.test).to.have.length(1);
    expect(stub.listeners.test[0]).to.exist;
    expect(stub.listeners.test[0]).to.equal(noop);
  });
  
  it('should remove event from internal listeners object', function() {
    stub.off('test', noop);
    
    expect(stub.listeners.test).to.have.length(0);
    expect(stub.listeners.test[0]).to.not.exist;
  });
  
  it('should throw if a function is not passed for a listener', function() {
    expect(function() {
      stub.on('foo', 'bar');
    }).to.throw(TypeError);
    
    expect(function() {
      stub.off('foo', 'bar');
    }).to.throw(TypeError);
  });
});
