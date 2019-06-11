'use strict'

var encode = require('./')

process.stdin.pipe(encode()).pipe(process.stdout)