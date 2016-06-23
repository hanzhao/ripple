import mongoose, { Schema } from 'mongoose'

const groupSchema = new Schema({
  name: {
    type: String
  },
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  chat: {
    type: Schema.Types.ObjectId,
    ref: 'Chat'
  }
})

const Group = mongoose.model('Group', groupSchema)

export default Group
