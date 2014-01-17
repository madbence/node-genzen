# genzen

Zen for Generators.

---

It's a small library, designed to fit seamlessly into the existing node ecosystem.

## Install

```
npm install genzen
```

*Note:* A decent version of node is required (at least 0.11.3)

## Usage

### genzen(gen[, zen])

Runs the generator `gen` until it reaches the zen state (haha!), then calls `zen`
(defaults to noop)

## Example

Thunks!

```js
var genzen = require('genzen');

var sleep = function(ms) {
  return function(fn) {
    setTimeout(fn, ms);
  };
};

genzen(function* () {
  console.log(1);
  yield sleep(1000);
});
```

Promises!

```js
var genzen = requrie('genzen');
var Q = require('q');

var sleep = function(ms) {
  var deferred = Q.defer();
  setTimeout(function() {
    deferred.resolve();
  }, ms);
  return deferred.promise;
};

genzen(function* () {
  console.log(1);
  yield sleep(1000);
  console.log(2);
});
```

Plain old node callbacks!

```js
var genzen = require('genzen')
var fs = require('fs');

genzen(function* (zen) {
  var result = yield fs.readFile('./exist', 'utf-8', zen);
  console.log(result);
  try {
    result = yield fs.readFile('./not.exist', 'utf-8', zen);
  } catch(err) {
    console.error(err);
  }
});
```

Nested generators! (generator delegation)

```js
var genzen = require('genzen');

function* nested(a, b, zen) {
  console.log(a);
  yield sleep(1000);
  console.log(b);
  yield sleep(1000);
}

genzen(function* (zen) {
  console.log(1);
  yield sleep(1000);
  console.log(2);
  yield* nested(3, 4, zen); // notice the `*` after yield
  console.log(5);
});
```

## Author

[@madbence](https://twitter.com/madbence) on Twitter
