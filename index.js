function noop() {}

module.exports = function genzen(gen, zen) {
  zen = zen || noop;
  var cont = function cont(err, res) {
    var next, throwed;
    try {
      if(err) {
        next = mind.throw(err);
      } else {
        next = mind.next(res);
      }
    } catch(ex) {
      throwed = ex;
    }
    let done = next.done,
        value = next.value;
    if(done) {
      return zen(throwed, value);
    }
    if(typeof value === 'function') {
      return value(cont);
    }
    if(Array.isArray(value) && value.every(function(el) {
      return typeof el === 'function';
    })) {
      //TODO parallel execution.
    }
    if(value && typeof value.then === 'function') {
      return value.then(function(val) {
        cont(null, val);
      }, cont);
    }
  };
  var mind = gen(cont);
  mind.next();
};
