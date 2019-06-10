'use strict'

var through = require('through2')

module.exports = function base64EncodeStream() {
  return through({encoding: 'base64'})
}