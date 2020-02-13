const superagent = require('superagent')

const fo = function(generatorFunction) {
  const generator = generatorFunction()

  next()

  // Call next() or throw() on the generator as necessary
  function next(v, isError) {
    const res = isError ? generator.throw(v) : generator.next(v)
    if (res.done) {
      return
    }
    handleAsync(res.value)
  }

  // Handle the result the generator yielded
  function handleAsync(async) {
    if (async && async.then) {
      handlePromise(async)
    } else if (typeof async === 'function') {
      handleThunk(async)
    } else {
      next(new Error(`Invalid yield ${async}`), true)
    }
  }

  // If the generator yielded a promise, call `.then()`
  function handlePromise(async) {
    async.then(next, (error) => next(error, true))
  }

  // If the generator yielded a thunk, call it
  function handleThunk(async) {
    async((error, v) => {
      error ? next(error, true) : next(v)
    })
  }
}

// fo in action
fo(function*() {
  const html = (yield superagent.get('http://www.google.com')).text
  console.log('html', html)
})
