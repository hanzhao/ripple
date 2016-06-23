import React from 'react'
import { connect } from 'react-redux'
import Icon from 'react-fontawesome'
import _ from 'lodash'

import {
  createChat
} from '../../modules/chat'
import UniversalCard from '../UniversalCard'
import { highlight } from '../../utils/helper'

import store from '../../store'

import styles from './styles'

const tidy = msg => (
  msg.replace(/<(?:.|\n)*?>/gm, '')
)

@connect(
  state => {
    switch (state.panel.activePanel) {
      case 'chat':
        return {
          records: state.chat.chats,
          idIndex: 'target._id',
          titleIndex: 'target.name',
          descriptionRender: e => {
            const msg = e.messages
            if (!msg.length) {
              return highlight('暂无消息')('暂无消息')
            } else if (msg[msg.length - 1].from._id === state.user._id) {
              /* 来自自己 */
              return highlight('我: ')(`我: ${tidy(msg[msg.length - 1].message)}`)
            } else {
              /* 来自别人 */
              return highlight(`${msg[msg.length - 1].from.name}: `)(`${msg[msg.length - 1].from.name}: ${tidy(msg[msg.length - 1].message)}`)
            }
          },
          handleCardClick: id => store.dispatch(createChat(id))
        }
      case 'search':
        return {
          records: state.panel.recommendedUsers,
          titleIndex: 'name',
          descriptionIndex: 'username',
          descriptionRender: e => highlight(state.panel.searchKey)(`@${e}`),
          handleCardClick: id => store.dispatch(createChat(id))
        }
      default:
        return {}
    }
  }
)
class UniversalList extends React.Component {
  render() {
    const { records, titleIndex, idIndex, descriptionIndex, descriptionRender,
        handleCardClick } = this.props
    return (
      <div className={styles.container}>
      { (!records || records.length == 0) &&
        <div className={styles.hint}>
          <div className={styles.icon}>
            <Icon name="comment-o" />
          </div>
          <span>还没有任何消息，添加一些朋友吧</span>
        </div>
      }
      { records &&
        records.map(r => (
          <UniversalCard key={r._id}
                         id={idIndex ? _.get(r, idIndex) : r._id}
                         title={_.get(r, titleIndex)}
                         description={descriptionIndex
                             ? _.get(r, descriptionIndex)
                             : r }
                         descriptionRender={descriptionRender}
                         onClick={handleCardClick} />
        ))
      }
      </div>
    )
  }
}

export default UniversalList
