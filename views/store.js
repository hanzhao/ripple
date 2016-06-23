import { createStore, applyMiddleware, compose } from 'redux'
import { browserHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'
import socketIOMiddleware from 'redux-socket.io'
import io from 'socket.io-client'

import reducer from './reducer'
import ajax from './base/ajax'

function ajaxMiddleware(client) {
  return ({ dispatch, getState }) => {
    return next => action => {
      if (typeof action === 'function') {
        return action(dispatch, getState)
      }
      const { promise, types, ...rest } = action
      if (!promise) {
        return next(action)
      }
      const [REQUEST, SUCCESS, FAILURE] = types
      next({ ...rest, type: REQUEST })
      const actionPromise = promise(client)
      actionPromise.then(
        result => next({ ...rest, result, type: SUCCESS }),
        error => next({ ...rest, error, type: FAILURE })
      ).catch(error => {
        console.error('MIDDLEWARE ERROR:', error)
        next({ ...rest, error, type: FAILURE })
      })
      return actionPromise
    }
  }
}

const _routerMiddleware = routerMiddleware(browserHistory)
const _ajaxMiddleware = ajaxMiddleware(ajax)
const socket = io()
const _socketIOMiddleware = socketIOMiddleware(socket, 'ripple/ws/')

const store = createStore(
  reducer, compose(
    applyMiddleware(_routerMiddleware, _ajaxMiddleware, _socketIOMiddleware),
    process.env.NODE_ENV === 'development' && window.devToolsExtension ?
        window.devToolsExtension() : f => f
  )
)

export default store
