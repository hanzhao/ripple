import React from 'react'
import Title from 'react-document-title'
import { asyncConnect } from 'redux-connect'

import FullPage from '../FullPage'
import OperationPanel from '../OperationPanel'
import MessageBrowser from '../MessageBrowser'
import {
  loadChatList
} from '../../modules/chat'

import styles from './styles'

@asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    return dispatch(loadChatList())
  }
}])
class MainPage extends React.Component {
  render() {
    return (
      <Title title="Ripple">
        <FullPage background blur>
          <div className={styles.wrapper}>
            <OperationPanel />
            <MessageBrowser />
          </div>
        </FullPage>
      </Title>
    )
  }
}

export default MainPage
