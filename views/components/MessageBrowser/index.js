import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import Icon from 'react-fontawesome'

import MessageList from '../MessageList'
import MessageEditor from '../MessageEditor'
import CreateGroupModal from '../CreateGroupModal'
import styles from './styles'

@connect(
  state => ({
    chat: state.chat.current
  })
)
class MessageBrowser extends React.Component {
  render() {
    const { chat } = this.props
    if (!chat) {
      return (
        <div className={styles.container}>
        </div>
      )
    }
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.name}>
            { chat.name }
          </span>
          {/* <span className={styles.info}>
            { chat.type === 0
              ? `最后一次在线于 ${moment(chat.lastVisited).fromNow()}`
              : `${chat.users} 个成员` }
          </span> */}
        </div>
        <MessageList className={styles.list} />
        <MessageEditor className={styles.editor} />
      </div>
    )
  }
}

export default MessageBrowser
