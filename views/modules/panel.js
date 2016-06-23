import { CREATE_CHAT_SUCCESS, CREATE_GROUP_SUCCESS } from './chat'

const ACTIVATE_CHAT = 'ripple/panel/ACTIVATE_CHAT'
const ACTIVATE_FRIENDS = 'ripple/panel/ACTIVATE_FRIENDS'
const ACTIVATE_SEARCH = 'ripple/panel/ACTIVATE_SEARCH'

const SEARCH_USER = 'ripple/panel/SEARCH_USER'
const SEARCH_USER_SUCCESS = 'ripple/panel/SEARCH_USER_SUCCESS'
const SEARCH_USER_FAIL = 'ripple/panel/SEARCH_USER_FAIL'

const SAVE_SEARCH_KEY = 'ripple/panel/SAVE_SEARCH_KEY'
const CLEAR_SEARCH = 'ripple/panel/CLEAR_SEARCH'

const initialState = {
  activeSelector: 'chat',
  activePanel: 'chat'
}

export const activateChat = () => ({
  type: ACTIVATE_CHAT
})

export const activateFriends = () => ({
  type: ACTIVATE_FRIENDS
})

export const activateSearch = () => ({
  type: ACTIVATE_SEARCH
})

export const saveSearchKey = q => ({
  type: SAVE_SEARCH_KEY,
  q: q
})

export const clearSearch = () => ({
  type: CLEAR_SEARCH
})

export const searchUser = q => ({
  types: [SEARCH_USER, SEARCH_USER_SUCCESS, SEARCH_USER_FAIL],
  promise: c => c.get('/api/user/search', { q })
})

export default function panel$reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ACTIVATE_CHAT:
      return {
        ...state,
        activeSelector: 'chat',
        activePanel: 'chat'
      }
    case ACTIVATE_FRIENDS:
      return {
        ...state,
        activeSelector: 'friends',
        activePanel: 'friends'
      }
    case ACTIVATE_SEARCH:
      // Close search
      if (state.activeSelector === 'search') {
        return {
          ...state,
          lastActiveSelect: null,
          activeSelector: state.lastActiveSelect,
          activePanel: state.lastActiveSelect
        }
      } else {
        return {
          ...state,
          lastActiveSelect: state.activeSelector,
          activeSelector: 'search'
        }
      }
    case SAVE_SEARCH_KEY:
      return {
        ...state,
        searchKey: action.q
      }
    case CLEAR_SEARCH:
      return {
        ...state,
        searchKey: null,
        activePanel: 'chat',
        recommendedUsers: null
      }
    case SEARCH_USER_SUCCESS:
      return {
        ...state,
        activePanel: 'search',
        recommendedUsers: action.result.users
      }
    case CREATE_CHAT_SUCCESS:
    case CREATE_GROUP_SUCCESS:
      return {
        ...state,
        activeSelector: 'chat',
        activePanel: 'chat'
      }
    default:
      return state
  }
}
