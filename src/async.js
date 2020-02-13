const async = function(callback) {
  setTimeout(() => callback(null, 'Hello, Async!'), 10)
}

const generatorFunction = function*() {
  const v = yield async
  console.log('v', v)
}
const generator = generatorFunction()
const res = generator.next()

res.value(function(error, res) {
  if (error) {
    console.log(error)
  }
  generator.next(res)
})
