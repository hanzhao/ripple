import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'

import RegisterForm from '../RegisterForm'
import LoginForm from '../LoginForm'
import {
  showRegisterForm,
  showLoginForm
} from '../../modules/user'

import styles from './styles'

@connect(
  state => ({
    activeForm: state.user.activeForm,
    submitting:
      (state.form['register-form'] && state.form['register-form']._submitting)
      || (state.form['login-form'] && state.form['login-form']._submitting)
  }),
  dispatch => ({
    showRegisterForm: () => dispatch(showRegisterForm()),
    showLoginForm: () => dispatch(showLoginForm())
  })
)
class UnitedForm extends React.Component {
  render() {
    const {
      activeForm, submitting,
      showRegisterForm, showLoginForm
    } = this.props
    return (
      <div className={classNames(styles.container, {
        [styles.submitting]: submitting
      })}>
        <div className={classNames(styles.selector, {
          [styles.login]: activeForm === 'login-form'
        })}>
          <a className={classNames({
            [styles.inactive]: activeForm === 'login-form'
          })}
             onClick={showRegisterForm}>
            注册
          </a>
          <a className={classNames({
            [styles.inactive]: activeForm === 'register-form'
          })}
             onClick={showLoginForm}>
            登录
          </a>
          <span className={styles.underline}></span>
        </div>
        <div className={styles.form}>
          { activeForm === 'register-form' &&
            <RegisterForm /> }
          { activeForm === 'login-form' &&
            <LoginForm /> }
        </div>
      </div>
    )
  }
}

export default UnitedForm
