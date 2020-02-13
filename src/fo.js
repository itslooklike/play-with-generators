const superagent = require('superagent')

const fo = function(generatorFunction) {
  const generator = generatorFunction()

  // Kick off the generator's execution
  step()

  // Call next() or throw() on the generator as necessary
  function step(value, isError) {
    const res = isError ? generator.throw(value) : generator.next(value)

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
      step(new Error(`Invalid yield ${async}`), true)
    }
  }

  // If the generator yielded a promise, call `.then()`
  function handlePromise(async) {
    async.then(step, (error) => step(error, true))
  }

  // If the generator yielded a thunk, call it
  function handleThunk(async) {
    async((error, value) => {
      error ? step(error, true) : step(value)
    })
  }
}

fo(function*() {
  try {
    const response = yield superagent.get('error here')
    console.log('response', response)
  } catch (error) {
    console.log(error.message)
  }

  const response = yield superagent.get('http://www.google.com')
  const html = response.text
  console.log('html', typeof html)
})

fo(function*() {
  const url = 'http://doesnot.exist.baddomain'
  const NUM_RETRIES = 3
  let res

  for (let i = 0; i < NUM_RETRIES; ++i) {
    try {
      // Going to yield 3 times, and `fo()` will call `generator.throw()`
      // 3 times because superagent will fail every time
      res = yield superagent.get(url)
      break
    } catch (error) {
      console.log('retry')
      /* retry */
    }
  }

  console.log('res retry', res)
})
