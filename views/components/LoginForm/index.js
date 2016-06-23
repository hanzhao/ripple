import React from 'react'
import { reduxForm } from 'redux-form'
import Icon from 'react-fontawesome'

import Input from '../Input'
import Button from '../Button'
import {
  login
} from '../../modules/user'

import styles from './styles'

const validate = values => {
  const errors = {}
  if (!values.username) {
    errors.username = '不能为空'
  }
  if (!values.password) {
    errors.password = '不能为空'
  }
  return errors
}

@reduxForm({
  form: 'login-form',
  fields: ['username', 'password'],
  validate
}, undefined, {
  onSubmit: data => login(data)
})
class LoginForm extends React.Component {
  render() {
    const { fields: { username, password },
        handleSubmit } = this.props
    return (
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input placeholder="用户名或邮箱" before={
          <Icon name="user" fixedWidth />
        } {...username} />
        <Input type="password" placeholder="密码" before={
          <Icon name="lock" fixedWidth />
        } {...password} />
        <Button type="submit" className={styles.button} large transparent>
          <Icon name="paper-plane-o" fixedWidth /> 登录 Ripple
        </Button>
      </form>
    )
  }
}

export default LoginForm
