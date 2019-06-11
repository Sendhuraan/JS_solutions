'use strict'

var zygon = require('zygon')

module.exports = function () {
  var l = arguments.length
  var cols = Array(l)
  var k = 0
  for (; k < l; k++) {
    cols[k] = arguments[k]
  }

  var tbl = zygon(cols)
  tbl.printHead()

  function write () {
    var l = arguments.length
    var args = Array(l)
    var k = 0
    for (; k < l; k++) {
      args[k] = arguments[k]
    }

    tbl.printRow(args)
  }
  write.dim = function (s) {
    process.stdout.write('\u001b[2m ' + s + ' ' + '\u001b[0m')
  }
  write.bold = function (s) {
    process.stdout.write('\u001b[1m ' + s + ' ' + '\u001b[0m')
  }
  write.newline = function () {
    return process.stdout.write('\n')
  }
  write.arrow = function () {
    var leftPad = arguments.length <= 0 || arguments[0] === undefined ? 3 : arguments[0]
    var rightPad = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1]
    return process.stdout.write(pad(leftPad) + '↳' + pad(rightPad))
  }
  write.spaces = function (n) {
    return process.stdout.write(pad(n))
  }
  return write
}

function pad (n) {
  return Array(n).join(' ')
}
