function noop() {}

module.exports = function genzen(gen, zen) {
  zen = zen || noop;
  let cont = function cont(err, res) {
    let next, throwed;
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
  };
  var mind = gen(cont);
  mind.next();
};
