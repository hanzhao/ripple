import is from 'is_js'

const usernameRegex = /^\w{3,18}$/

export default function validate(values) {
  const errors = {}
  // username
  if (!values.username || typeof values.username !== 'string') {
    errors.username = '不能为空'
  } else if (values.username.length < 3) {
    errors.username = '不能少于 3 个字符'
  } else if (values.username.length > 18) {
    errors.username = '不能多于 18 个字符'
  } else if (!usernameRegex.test(values.username)) {
    errors.username = '不能包含特殊字符'
  }
  // password
  if (!values.password || typeof values.password !== 'string') {
    errors.password = '不能为空'
  } else if (values.password.length < 6) {
    errors.password = '不能少于 6 个字符'
  } else if (values.password.length > 32) {
    errors.password = '不能多于 32 个字符'
  }
  // email
  if (!values.email || typeof values.email !== 'string') {
    errors.email = '不能为空'
  } else if (!is.email(values.email)) {
    errors.email = '格式不合法'
  }
  return errors
}
