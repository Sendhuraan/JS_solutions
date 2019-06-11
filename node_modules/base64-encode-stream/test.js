'use strict'

var test = require('tap').test
var through = require('through2')
var encode = require('./')

test('encodes stream data to base64', function (assert) {
  var i = through()
  var o = through(function (chunk, enc, cb) {
    assert.is(chunk.toString(), 'dGVz')
    assert.end()
  })

  i.pipe(encode()).pipe(o)
  i.end('test')
})