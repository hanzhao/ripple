import mongoose, { Schema } from 'mongoose'

const chatSchema = new Schema({
  // 历史记录
  messages: [{
    from: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    to: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    at: {
      type: Date,
      default: Date.now()
    },
    message: {
      type: Schema.Types.Mixed
    }
  }]
})

const Chat = mongoose.model('Chat', chatSchema)

export default Chat
