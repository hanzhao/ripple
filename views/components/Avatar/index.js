import React from 'react'

import defaultAvatar from './default.png'
import styles from './styles'

class Avatar extends React.Component {
  render() {
    return (
      <img className={styles.avatar} src={defaultAvatar} />
    )
  }
}

export default Avatar
