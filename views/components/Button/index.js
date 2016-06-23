import React from 'react'
import classNames from 'classnames'

import styles from './styles'

class Button extends React.Component {
  render() {
    return (
      <button {...this.props}
        className={classNames(styles.button, this.props.className, {
          [styles.large]: this.props.large,
          [styles.small]: this.props.small,
          [styles.transparent]: this.props.transparent,
          [styles.inverse]: this.props.inverse
        })}>
        { this.props.children }
      </button>
    )
  }
}

export default Button
