import React from 'react'
import { connect } from 'react-redux'
import Icon from 'react-fontawesome'

import Avatar from '../Avatar'
import CreateGroupModal from '../CreateGroupModal'
import {
  toggleCreateGroupModal
} from '../../modules/chat'

import styles from './styles'

@connect(
  state => ({
    name: state.user.name
  }),
  dispatch => ({
    toggleCreateGroupModal: () => dispatch(toggleCreateGroupModal())
  })
)
class UserProfile extends React.Component {
  render() {
    const { name } = this.props
    return (
      <div className={styles.profile}>
        <Avatar />
        <span className={styles.name}>{ name }</span>
        <span className={styles.icon}>
          <Icon name="plus" fixedWidth onClick={this.props.toggleCreateGroupModal} />
          <CreateGroupModal />
        </span>
      </div>
    )
  }
}

export default UserProfile
