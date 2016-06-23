import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import Icon from 'react-fontawesome'

import SearchInput from '../SearchInput'
import {
  activateChat,
  activateFriends,
  activateSearch
} from '../../modules/panel'

import styles from './styles'

@connect(
  state => ({
    activeSelector: state.panel.activeSelector
  }),
  dispatch => ({
    activateChat: () => dispatch(activateChat()),
    activateFriends: () => dispatch(activateFriends()),
    activateSearch: () => dispatch(activateSearch())
  })
)
class PanelSelector extends React.Component {
  render() {
    const { activeSelector,
        activateChat, activateFriends, activateSearch } = this.props
    return (
      <div className={styles.selectors}>
        { activeSelector === 'search' &&
          <SearchInput className={styles.searchBox}
                       placeholder="搜索" autoFocus /> }
        { activeSelector !== 'search' &&
          <div className={classNames(styles.selector, {
            [styles.active]: activeSelector === 'chat'
          })} onClick={activateChat}>
            <Icon name="comments" fixedWidth />
          </div> }
        { false && activeSelector !== 'search' &&
          <div className={classNames(styles.selector, {
            [styles.active]: activeSelector === 'friends'
          })} onClick={activateFriends}>
            <Icon name="users" fixedWidth />
          </div> }
        <div className={classNames(styles.selector, {
          [styles.active]: activeSelector === 'search'
        })} onClick={activateSearch}>
          <Icon name={activeSelector === 'search' ? "close" : "search"}
                fixedWidth />
        </div>
      </div>
    )
  }
}

export default PanelSelector
