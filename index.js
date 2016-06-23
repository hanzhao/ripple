'use strict'
global.Promise = require('bluebird')
global.ROOT = __dirname

require('babel-register')
require('./app')
