import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import classNames from 'classnames'
import MediumEditor from 'medium-editor'
import Icon from 'react-fontawesome'

import {
  sendChatMessage
} from '../../modules/ws'
import Button from '../Button'
import Avatar from '../Avatar'
import styles from './styles'

@connect(
  state => ({
    target: state.chat.current._id,
    chat: state.chat.current.chatId
  }),
  dispatch => ({
    handleSendMessage: (target, chat, message) => (
      dispatch(sendChatMessage(target, chat, message))
    )
  })
)
class MessageEditor extends React.Component {
  componentDidMount() {
    this.editorNode = ReactDOM.findDOMNode(this.refs.textarea)
    this.editor = new MediumEditor(this.editorNode, {
      toolbar: {
        buttons: ['bold', 'italic', 'underline', 'pre', 'quote',
                  'orderedlist', 'unorderedlist', 'h3', 'h4', 'h5']
      },
      placeholder: {
        text: '输入一些消息，按 <Ctrl> + <Enter> 发送',
        hideOnClick: false
      }
    })
    this.editorNode.addEventListener('keypress', e => {
      if (e.code === 'Enter' && (e.ctrlKey || e.metaKey)) {
        this.sendMessage()
      }
    })
  }
  sendMessage = () => {
    const { target, chat, handleSendMessage } = this.props
    handleSendMessage(target, chat, this.editorNode.innerHTML)
    this.editorNode.innerHTML = ''
  }
  render() {
    return (
      <div {...this.props}
           className={classNames(styles.container, this.props.className)}>
        {/* <div className={styles.avatar}>
          <Avatar />
        </div> */}
        <div className={styles.editor}>
          <div className={styles.textarea} ref="textarea">

          </div>
          <div className={styles.buttons}>
            <Button onClick={this.sendMessage} transparent inverse>
              <Icon name="paper-plane" /> 发送
            </Button>
          </div>
        </div>
        {/* <div className={styles.avatar}>
          <Avatar />
        </div> */}
      </div>
    )
  }
}

export default MessageEditor
