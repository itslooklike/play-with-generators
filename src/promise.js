const co = require('co')
const assert = require('assert')

const promise = {
  then: function(onFulfilled, onRejected) {
    setTimeout(() => onFulfilled('Hello, World!'), 0)
  },
}

co(function*() {
  const str = yield promise
  assert.equal(str, 'Hello, World!')
})
