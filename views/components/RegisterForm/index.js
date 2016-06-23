import React from 'react'
import { reduxForm } from 'redux-form'
import Icon from 'react-fontawesome'

import Input from '../Input'
import Button from '../Button'
import validate from '../../../validators/user'
import {
  register
} from '../../modules/user'

import styles from './styles'

@reduxForm({
  form: 'register-form',
  fields: ['username', 'password', 'email'],
  validate
}, undefined, {
  onSubmit: data => register(data)
})
class RegisterForm extends React.Component {
  render() {
    const { fields: { username, password, email },
        handleSubmit } = this.props
    return (
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input placeholder="用户名" before={
          <Icon name="user-plus" fixedWidth />
        } {...username} />
        <Input placeholder="密码（不少于 6 位）" type="password" before={
          <Icon name="lock" fixedWidth />
        } {...password} />
        <Input placeholder="常用邮箱" before={
          <Icon name="envelope" fixedWidth />
        } {...email} />
        <Button type="submit" className={styles.button} large transparent>
          <Icon name="paper-plane" fixedWidth /> 加入 Ripple
        </Button>
      </form>
    )
  }
}

export default RegisterForm
