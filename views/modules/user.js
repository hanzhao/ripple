import { push } from 'react-router-redux'
import store from '../store'

const SHOW_REGISTER_FORM = 'ripple/user/SHOW_REGISTER_FORM'
const SHOW_LOGIN_FORM = 'ripple/user/SHOW_LOGIN_FORM'

const REGISTER = 'ripple/user/REGISTER'
const REGISTER_SUCCESS = 'ripple/user/REGISTER_SUCCESS'
const REGISTER_FAIL = 'ripple/user/REGISTER_FAIL'

const LOGIN = 'ripple/user/LOGIN'
const LOGIN_SUCCESS = 'ripple/user/LOGIN_SUCCESS'
const LOGIN_FAIL = 'ripple/user/LOGIN_FAIL'

const LOAD_INFO = 'ripple/user/LOAD_INFO'
export const LOAD_INFO_SUCCESS = 'ripple/user/LOAD_INFO_SUCCESS'
const LOAD_INFO_FAIL = 'ripple/user/LOAD_INFO_FAIL'

const initialState = {
  activeForm: 'register-form'
}

export const showRegisterForm = () => ({
  type: SHOW_REGISTER_FORM
})

export const showLoginForm = () => ({
  type: SHOW_LOGIN_FORM
})

export const register = data => ({
  types: [REGISTER, REGISTER_SUCCESS, REGISTER_FAIL],
  promise: c => c.post('/api/user/register', data)
})

export const login = data => ({
  types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
  promise: c => c.post('/api/user/login', data)
})

export const loadUserInfo = () => ({
  types: [LOAD_INFO, LOAD_INFO_SUCCESS, LOAD_INFO_FAIL],
  promise: c => c.get('/api/user')
})

export default function user$reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SHOW_REGISTER_FORM:
      return {
        ...state,
        activeForm: 'register-form'
      }
    case SHOW_LOGIN_FORM:
      return {
        ...state,
        activeForm: 'login-form'
      }
    case LOAD_INFO_SUCCESS:
      return {
        ...state,
        ...action.result.user
      }
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      setTimeout(() => {
        location.href = '/'
      }, 1)
      return state
    default:
      return state
  }
}
