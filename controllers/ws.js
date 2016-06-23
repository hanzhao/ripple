import _ from 'lodash'
import sanitizeHtml from 'sanitize-html'

import { Chat, Group } from '../models'

/* ws */
const SEND_CHAT_MESSAGE = 'ripple/ws/SEND_CHAT_MESSAGE'
const RECV_CHAT_MESSAGE = 'ripple/ws/RECV_CHAT_MESSAGE'
const PUSH_NEW_CHAT = 'ripple/ws/PUSH_NEW_CHAT'

/* all clients */
const sockets = {}

/* Add socket to sockets pool */
const addSocket = (user, socket) => {
  sockets[user._id] = sockets[user._id] || []
  sockets[user._id].push(socket)
  console.log(`Connect user: ${user._id}`,
      `the user has ${sockets[user._id].length} client(s) now`)
}

/* Remove from socket pool */
const removeSocket = (user, socket) => {
  _.remove(sockets[user._id], socket)
  console.log(`${user._id} disconnect`,
      `the user has ${sockets[user._id].length} client(s) now`)
}

export const pushNewChat = (userId, chat) => {
  sockets[userId] && sockets[userId].forEach(s => {
    s.emit('action', {
      type: PUSH_NEW_CHAT,
      data: chat
    })
  })
}

/* Reducer */
async function reducer(socket, action, user) {
  switch (action.type) {
    case SEND_CHAT_MESSAGE:
      action.data.message = sanitizeHtml(action.data.message)
      action.data.at = Date.now()
      action.data.from = user
      action.data.to = action.data.target
      const { target, chat, message, at } = action.data

      /* varifying */
      if (!target || !chat || !message) { return }
      if (typeof target !== 'string' || typeof chat !== 'string') { return }

      /* Group */
      const group = await Group.findById(target).select('users').exec()
      if (group) {
        action.data.by = target
        group.users.forEach(u => {
          u != user._id && sockets[u] && sockets[u].forEach(s => {
            s.emit('action', {
              type: RECV_CHAT_MESSAGE,
              data: action.data
            })
          })
        })
      } else {
        /* Send to the other */
        sockets[target] && sockets[target].forEach(s => {
          s.emit('action', {
            type: RECV_CHAT_MESSAGE,
            data: action.data
          })
        })
      }

      /* Save into database */
      /* TODO: target/chat verify */
      let c = await Chat.findById(chat).exec()
      c.messages.push({
        from: user._id,
        to: target,
        at, message
      })
      await c.save()
      return
    default:
      break
  }
}

export default function ws(io) {
  io.on('connection', socket => {
    let { user } = socket.handshake.session
    if (user) {
      console.log(`New user ${user.name}(${user._id}) is trying to connect`)
      addSocket(user, socket)
    }
    socket.on('action', action => {
      if (!user) { return }
      try {
        reducer(socket, action, user)
      } catch (e) {
        console.error('Error in Message reducer, ${e.stack}')
      }
    })
    socket.on('disconnect', () => {
      if (user) { removeSocket(user, socket) }
    })
  })
}
