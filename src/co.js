const co = require('co')
const superagent = require('superagent')

co(function*() {
  const html = yield superagent.get('http://www.google.com')
  const textHtml = html.text
  console.log(textHtml)
})
