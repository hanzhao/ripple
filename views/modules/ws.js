/* ws */
export const SEND_CHAT_MESSAGE = 'ripple/ws/SEND_CHAT_MESSAGE'
export const RECV_CHAT_MESSAGE = 'ripple/ws/RECV_CHAT_MESSAGE'
export const PUSH_NEW_CHAT = 'ripple/ws/PUSH_NEW_CHAT'

export const sendChatMessage = (target, chat, message) => ({
  type: SEND_CHAT_MESSAGE,
  data: {
    target, chat, message
  }
})

const initialState = {}

export default function ws$reducer(state = initialState, action = {}) {
  switch (action.type) {
    case RECV_CHAT_MESSAGE:
      return state
    default:
      return state
  }
}
