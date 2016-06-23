import React from 'react'
import ReactDOM from 'react-dom'

import { Provider, connect } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { asyncConnect, ReduxAsyncConnect } from 'redux-connect'

import moment from 'moment'
moment.locale('zh-cn')

import store from './store'

import App from './components/App'
import MainPage from './components/MainPage'
import LoginPage from './components/LoginPage'

const history = syncHistoryWithStore(browserHistory, store)

const router = (
  <Provider store={store}>
    <Router history={history}
            render={props => <ReduxAsyncConnect {...props} />}>
      <Route path="/" component={App}>
        <IndexRoute component={MainPage} />
        <Route path="/login" component={LoginPage} />
      </Route>
    </Router>
  </Provider>
)

ReactDOM.render(router, document.getElementById('react-root'))
