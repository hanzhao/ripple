import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema({
  username: {
    type: String,
    index: true,
    unique: true
  },
  password: {
    type: String
  },
  name: {
    type: String
  },
  email: {
    type: String,
    index: true,
    unique: true
  },
  chats: [{
    // 0: 私聊, 1: 群聊
    type: { type: Number },
    target: { type: Schema.Types.ObjectId },
    chat: {
      type: Schema.Types.ObjectId,
      ref: 'Chat'
    },
    lastVisited: {
      type: Date,
      default: Date.now()
    }
  }],
  lastVisited: {
    type: Date,
    default: Date.now()
  }
})

const User = mongoose.model('User', userSchema)

export default User
