/*
 * Ripple Online Chatting
 */
'use strict'

import http from 'http'
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import Session from 'express-session'
import logger from 'morgan'
import favicon from 'serve-favicon'
import fallback from 'connect-history-api-fallback'
import ConnectRedis from 'connect-redis'
import Redis from 'ioredis'

import SocketIO from 'socket.io'
import IOSession from 'socket.io-express-session'

import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackDevConfig from './webpack.config.dev'

import './models'
import config from './config'
import controllers from './controllers'
import ws from './controllers/ws'

const env = process.env.NODE_ENV || 'development'
const port = process.env.PORT || 3000
const RedisStore = ConnectRedis(Session)

const app = express()
app.locals.ENV = env
app.locals.ENV_DEVELOPMENT = (env === 'development')
app.set('query parser', 'simple')
app.disable('x-powered-by')

const session = Session({
  name: 'ripple.sess',
  secret: config.cookie.secret,
  saveUninitialized: false,
  resave: false,
  store: new RedisStore({ client: new Redis(config.redis) }),
})

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(cookieParser(config.cookie.secret))
app.use(session)
app.use((req, res, next) => {
  res.success = function res$success (data) {
    this.json({ _: 0, data })
  }
  res.fail = function res$fail (error) {
    this.json({ _: -1, error })
  }
  res.bad = function res$bad () {
    this.status(400).json({ _: -2, error: 'bad request' })
  }
  res.forbidden = function res$forbidden () {
    this.status(403).json({ _: -4, error: 'forbidden' })
  }
  next()
})
app.use(controllers)
app.use(fallback())
if (env === 'development') {
  const compiler = webpack(webpackDevConfig)
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: '/',
    stats: { colors: true }
  }))
  app.use(webpackHotMiddleware(compiler))
}
app.use(express.static(`${ROOT}/public`))

app.use((err, req, res, next) => {
  res.status(500).send(env === 'development' ? err.stack : 'Error')
  console.error(err)
})

const server = http.createServer(app)
const io = SocketIO(server)
io.use(IOSession(session))
ws(io)

server.listen(port, () => {
  console.log(`Ripple listening on port ${server.address().port}`)
})
