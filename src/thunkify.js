const co = require('co')
const superagent = require('superagent')
const thunkify = require('thunkify')

co(function*() {
  const thunk = thunkify(superagent.get)('http://www.google.com')

  console.log('typeof thunk', typeof thunk)
  console.log('thunk.length', thunk.length)

  const html = yield thunk

  console.log('html', html)
}).catch((error) => console.log(error))
