import React from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'

import '../../3rd/particleground.min'

import styles from './styles'

class FullPage extends React.Component {
  componentDidMount() {
    if (this.props.background && this.props.particle) {
      window.particleground(ReactDOM.findDOMNode(this.refs.background), {
        dotColor: 'rgba(255, 255, 255, 0.6)',
        lineColor: 'rgba(255, 255, 255, 0.1)',
        minSpeedX: 0.075,
        maxSpeedX: 0.15,
        minSpeedY: 0.075,
        maxSpeedY: 0.15,
        density: 10000,
        curvedLines: false,
        proximity: 20,
        parallaxMultiplier: 20,
        particleRadius: 2
      })
    }
  }
  render() {
    return (
      <div className={styles.fullpage}>
        { this.props.background &&
          <figure ref="background" className={classNames(styles.background, {
            [styles.blur]: this.props.blur
          })} /> }
        { this.props.children }
      </div>
    )
  }
}

export default FullPage
