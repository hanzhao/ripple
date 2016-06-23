import React from 'react'
import classNames from 'classnames'

import styles from './styles'

class Input extends React.Component {
  render() {
    // Dont need a group
    if (!this.props.before) {
      return (
        <input autoComplete="off" spellCheck={false} {...this.props}
               className={classNames(styles.input, this.props.className)} />
      )
    }
    return (
      <span className={styles.group}>
        { this.props.before &&
          <span className={styles.before}>{ this.props.before }</span> }
        <input autoComplete="off" spellCheck={false} {...this.props}
               className={classNames(styles.input, this.props.className)} />
        { this.props.touched && this.props.error &&
          <span className={styles.hint}>{ this.props.error }</span> }
      </span>
    )
  }
}

export default Input
