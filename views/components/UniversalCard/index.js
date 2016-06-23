import React from 'react'
import classNames from 'classnames'

import Avatar from '../Avatar'

import styles from './styles'

class UniversalCard extends React.Component {
  render() {
    return (
      <div {...this.props}
           title={null}
           className={classNames(styles.card, this.props.className)}
           onClick={this.props.onClick.bind(this, this.props.id)}>
        <div className={styles.avatar}>
          <Avatar />
        </div>
        <div className={styles.content}>
          <div className={styles.title}>
            { this.props.title || '　' }
          </div>
          <div className={styles.description}>
            { this.props.descriptionRender
              ? this.props.descriptionRender(this.props.description)
              : this.props.description || '　' }
          </div>
        </div>
        <div className={styles.other}>
          <div></div>
        </div>
      </div>
    )
  }
}

export default UniversalCard
