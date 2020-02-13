const fibonacciGenerator = function*(n) {
  let back2 = 0
  let back1 = 1
  let cur = 1
  for (let i = 0; i < n - 1; ++i) {
    cur = back2 + back1
    back2 = back1
    back1 = cur
    yield cur
  }
  return cur
}

for (const x of fibonacciGenerator(5)) {
  console.log(x)
}
