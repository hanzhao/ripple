import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import { reducer as reduxAsyncConnect } from 'redux-connect'
import { reducer as form } from 'redux-form'

import user from './modules/user'
import panel from './modules/panel'
import chat from './modules/chat'
import ws from './modules/ws'

export default combineReducers({
  reduxAsyncConnect,
  form,
  routing,
  user,
  panel,
  chat,
  ws
})
