import _ from 'lodash'
import { push } from 'react-router-redux'
import store from '../store'

const LOAD_CHAT_INFO = 'ripple/chat/LOAD_CHAT_INFO'
const LOAD_CHAT_INFO_SUCCESS = 'ripple/chat/LOAD_CHAT_INFO_SUCCESS'
const LOAD_CHAT_INFO_FAIL = 'ripple/chat/LOAD_CHAT_INFO_FAIL'

const CREATE_CHAT = 'ripple/chat/CREATE_CHAT'
export const CREATE_CHAT_SUCCESS = 'ripple/chat/CREATE_CHAT_SUCCESS'
const CREATE_CHAT_FAIL = 'ripple/chat/CREATE_CHAT_FAIL'

const LOAD_CHAT_LIST = 'ripple/chat/LOAD_CHAT_LIST'
const LOAD_CHAT_LIST_SUCCESS = 'ripple/chat/LOAD_CHAT_LIST_SUCCESS'
const LOAD_CHAT_LIST_FAIL = 'ripple/chat/LOAD_CHAT_LIST_FAIL'

const TOGGLE_CREATE_GROUP_MODAL = 'ripple/chat/TOGGLE_CREATE_GROUP_MODAL'

const CREATE_GROUP = 'ripple/chat/CREATE_GROUP'
export const CREATE_GROUP_SUCCESS = 'ripple/chat/CREATE_GROUP_SUCCESS'
const CREATE_GROUP_FAIL = 'ripple/chat/CREATE_GROUP_FAIL'

import {
  SEND_CHAT_MESSAGE,
  RECV_CHAT_MESSAGE,
  PUSH_NEW_CHAT
} from './ws'
import { LOAD_INFO_SUCCESS } from './user'

const initialState = {}

const tidy = msg => (
  msg.replace(/<(?:.|\n)*?>/gm, '')
)

export const loadChatList = () => ({
  types: [LOAD_CHAT_LIST, LOAD_CHAT_LIST_SUCCESS, LOAD_CHAT_LIST_FAIL],
  promise: c => c.get(`/api/chats`)
})

export const createChat = id => ({
  types: [CREATE_CHAT, CREATE_CHAT_SUCCESS, CREATE_CHAT_FAIL],
  promise: async c => {
    await c.post('/api/chat/new', { target: id })
    return await c.get(`/api/chat/${id}`)
  }
})

export const loadChatInfo = id => ({
  types: [LOAD_CHAT_INFO, LOAD_CHAT_INFO_SUCCESS, LOAD_CHAT_INFO_FAIL],
  promise: c => c.get(`/api/chat/${id}`)
})

export const toggleCreateGroupModal = () => ({
  type: TOGGLE_CREATE_GROUP_MODAL
})

export const createGroup = (data) => {
  const users = Object.keys(data.users).filter(e => data.users[e])
  return {
    types: [CREATE_GROUP, CREATE_GROUP_SUCCESS, CREATE_GROUP_FAIL],
    promise: c => c.post('/api/group/new', {
      name: data.name,
      users
    })
  }
}

export default function chat$reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_CHAT_LIST_SUCCESS:
      if (typeof Notification !== 'undefined' &&
          Notification.permission !== 'granted') {
        Notification.requestPermission()
      }
      return {
        ...state,
        chats: action.result.chats.map(e => ({
          _id: e.chat._id,
          lastVisited: e.lastVisited,
          target: e.target,
          type: e.type,
          messages: e.chat.messages
        })).sort((a, b) => (
          a.messages[a.messages.length - 1].at
              < b.messages[b.messages.length - 1].at ? 1 : -1
        ))
      }
    case LOAD_CHAT_LIST_FAIL:
      setTimeout(() => {
        store.dispatch(push('/login'))
      }, 0)
      return state
    case CREATE_CHAT_SUCCESS:
      setTimeout(() => {
        const e = new Event('scrollList')
        window.dispatchEvent(e)
      }, 0)
      return {
        ...state,
        current: action.result
      }
    case PUSH_NEW_CHAT:
      return {
        ...state,
        chats: [{
          _id: action.data.chat._id,
          lastVisited: action.data.lastVisited,
          target: action.data.target,
          type: action.data.type,
          messages: action.data.chat.messages
        }, ...state.chats]
      }
    case LOAD_INFO_SUCCESS:
      return {
        ...state,
        user: action.result.user
      }
    case TOGGLE_CREATE_GROUP_MODAL:
      return {
        ...state,
        showCreateGroupModal: !state.showCreateGroupModal
      }
    case CREATE_GROUP_SUCCESS:
      return {
        ...state,
        showCreateGroupModal: false
      }
    case SEND_CHAT_MESSAGE:
      const msg = {
        ...action.data,
        at: Date.now(),
        from: state.user,
        to: action.data.target
      }
      const index = _.findIndex(state.chats, e => (
        e.target._id === action.data.target
      ))
      setTimeout(() => {
        const e = new Event('scrollList')
        window.dispatchEvent(e)
      }, 0)
      return {
        ...state,
        chats: [...state.chats.slice(0, index),
                {
                  ...state.chats[index],
                  messages: [...state.chats[index].messages, msg]
                },
                ...state.chats.slice(index + 1)]
      }
    case RECV_CHAT_MESSAGE:
      const idx = action.data.by ? _.findIndex(state.chats, e => (
        e.target._id === action.data.by
      )) : _.findIndex(state.chats, e => (
        e.target._id === action.data.from._id
      ))
      setTimeout(() => {
        const e = new Event('scrollList')
        window.dispatchEvent(e)
      }, 0)
      if (typeof Notification !== 'undefined' &&
          Notification.permission === 'granted') {
        new Notification(`${action.data.from.name} - Ripple`, {
          body: tidy(action.data.message)
        })
      }
      return {
        ...state,
        chats: [...state.chats.slice(0, idx),
                {
                  ...state.chats[idx],
                  messages: [...state.chats[idx].messages, action.data]
                },
                ...state.chats.slice(idx + 1)]
      }
    default:
      return state
  }
}
