import React from 'react'
import { asyncConnect } from 'redux-connect'

import {
  loadUserInfo
} from '../../modules/user'

import './styles'

@asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    dispatch(loadUserInfo())
  }
}])
class App extends React.Component {
  render() {
    return (
      <div>
        { this.props.children }
      </div>
    )
  }
}

export default App
