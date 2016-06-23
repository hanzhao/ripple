import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import _ from 'lodash'
import moment from 'moment'

import store from '../../store'
import { RECV_CHAT_MESSAGE } from '../../modules/ws'
import Avatar from '../Avatar'
import styles from './styles'

@connect(
  state => {
    if (!state.chat.current) {
      return {}
    }
    const idx = _.findIndex(state.chat.chats, { _id: state.chat.current.chatId })
    if (idx === -1) {
      return {}
    }
    return {
      messages: state.chat.chats[idx].messages
    }
  }
)
class MessageList extends React.Component {
  componentDidMount() {
    window.addEventListener('scrollList', () => {
      this.refs.list.scrollTop = this.refs.list.scrollHeight
    })
  }
  render() {
    const { messages } = this.props
    return (
      <div {...this.props} ref="list"
           className={classNames(styles.container, this.props.className)}>
        { messages &&
          messages.map((e, i) => (
            <div key={i} className={styles.line}>
              <div className={styles.avatar}>
                <Avatar />
              </div>
              <div className={styles.content}>
                <div className={styles.name}>{ e.from.name }</div>
                <div className={styles.message}
                     dangerouslySetInnerHTML={{ __html: e.message }}>
                </div>
              </div>
              <div className={styles.time}>
                { moment(e.at).format('MM-DD HH:mm:ss') }
              </div>
            </div>
          ))
        }
      </div>
    )
  }
}

export default MessageList
