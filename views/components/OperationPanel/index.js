import React from 'react'

import UserProfile from '../UserProfile'
import PanelSelector from '../PanelSelector'
import UniversalList from '../UniversalList'

import styles from './styles'

class OperationPanel extends React.Component {
  render() {
    return (
      <div className={styles.panel}>
        <UserProfile />
        <PanelSelector />
        <UniversalList />
      </div>
    )
  }
}

export default OperationPanel
