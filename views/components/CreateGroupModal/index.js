import React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import Icon from 'react-fontawesome'
import Dialog from 'rc-dialog'
import Input from '../Input'
import Button from '../Button'
import {
  toggleCreateGroupModal,
  createGroup
} from '../../modules/chat'

import styles from './styles'

const validate = (values) => {
  const errors = {}
  if (!values.name) {
    errors.name = '不能为空'
  }
  return errors
}

@connect(
  state => ({
    show: state.chat.showCreateGroupModal,
    users: state.chat.chats.filter(e => e.type === 0)
                           .map(e => e.target)
                           .sort((a, b) => a.name.localeCompare(b.name))
  }),
  dispatch => ({
    toggleCreateGroupModal: () => dispatch(toggleCreateGroupModal())
  })
)
@reduxForm({
  form: 'create-group',
  fields: ['name', 'users'],
  validate
}, state => ({
  initialValues: {
    users: {}
  }
}), {
  onSubmit: data => createGroup(data)
})
class CreateGroupModal extends React.Component {
  handleCheck = (e) => {
    const { fields: { users } } = this.props
    if (e.target.checked) {
      users.value[e.target.dataset.id] = true
    } else {
      users.value[e.target.dataset.id] = false
    }
  }
  render() {
    const { fields: { name, users }, handleSubmit } = this.props
    return (
      <Dialog title="发起群聊" visible={this.props.show}
              onClose={this.props.toggleCreateGroupModal}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.row}>
            <Input before={<Icon name="users" />}
                   className={styles.input} placeholder="请输入群组名" inverse
                 {...name} />
          </div>
          <div className={styles.title}>成员列表</div>
          <div className={styles.row}>
            <div className={styles.container}>
            { this.props.users.map(e => (
              <div key={e._id}>
                <label className={styles.label}>
                  <input type="checkbox" className={styles.radio}
                      data-id={e._id}
                      onChange={this.handleCheck} />
                  <span className={classNames(styles.checkbox, styles.radioInput)} />
                  {e.name}
                </label>
              </div>
            )) }
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Button type="submit" transparent inverse>创建群组</Button>
          </div>
        </form>
      </Dialog>
    )
  }
}

export default CreateGroupModal
