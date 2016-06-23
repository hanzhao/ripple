import mongoose from 'mongoose'
mongoose.Promise = global.Promise

import config from '../config'

mongoose.connect(config.mongo.uri, config.mongo.options, (err) => {
  if (err) {
    console.log(`mongo: ${err.message}`)
  } else {
    console.log(`mongo: connected to ${config.mongo.uri}...`)
  }
})

export User from './user'
export Group from './group'
export Chat from './chat'
