import _ from 'lodash'
import { Router } from 'express'
import mongoose from 'mongoose'

import { User, Chat, Group } from '../models'
import { pushNewChat } from './ws'

const router = Router()

router.get('/chats', async (req, res) => {
  if (!req.session.user) {
    return res.forbidden()
  }
  const user = await User.findById(req.session.user._id)
      .select('chats').exec()
  const chats = []
  for (const e of user.chats) {
    const target = e.type === 0 ? await User.findById(e.target).select('name').exec()
        : await Group.findById(e.target).select('name').exec()
    const chat = await Chat.findById(e.chat).populate('messages.from', 'name').exec()
    chats.push({
      ...e._doc,
      target, chat
    })
  }
  return res.success({ chats: chats.filter(e => e.chat.messages.length > 0) })
})

router.post('/chat/new', async (req, res) => {
  if (!req.session.user) {
    return res.forbidden()
  }
  if (!req.body.target || typeof req.body.target !== 'string' ||
      !mongoose.Types.ObjectId.isValid(req.body.target)) {
    return res.bad()
  }
  const user = await User.findById(req.session.user._id)
      .select('chats').exec()
  const idx = _.findIndex(user.chats, e => e.target.equals(req.body.target))
  if (idx === -1) {
    const target = await User.findById(req.body.target).select('chats').exec()
    if (!target) {
      return res.fail({ type: 'INVALID_TARGET' })
    }
    const here = await User.findById(req.session.user._id)
        .select('name').exec()
    const there = await User.findById(req.body.target)
        .select('name').exec()
    // Chat not exsits
    const chat = new Chat({
      messages: [{
        from: here,
        to: req.body.target,
        message: '<p>我在 ripple 上发现了你，现在开始聊天吧</p>'
      }]
    })
    await chat.save()
    const myChat = {
      type: 0,
      target: there,
      chat,
      lastVisited: new Date()
    }
    user.chats.push(myChat)
    const yourChat = {
      type: 0,
      target: here,
      chat,
      lastVisited: new Date()
    }
    target.chats.push(yourChat)
    // push
    pushNewChat(req.session.user._id, myChat)
    pushNewChat(req.body.target, yourChat)
    await user.save()
    await target.save()
    return res.success()
  } else {
    return res.success()
  }
})

router.post('/group/new', async (req, res, next) => {
  if (!req.session.user) {
    return res.forbidden()
  }
  if (!req.body.name || !req.body.users || !(req.body.users instanceof Array)) {
    return res.bad()
  }
  const users = [...req.body.users, req.session.user._id]
  const here = await User.findById(req.session.user._id).select('name').exec()
  const group = new Group({
    name: req.body.name,
    createdBy: req.session.user._id,
    users: users
  })
  // create new chat
  const chat = new Chat({
    messages: [{
      from: here,
      to: group._id,
      message: '<p>我发起了一次群聊，我们一起聊天吧</p>'
    }]
  })
  group.chat = chat
  await chat.save()
  await group.save()
  const myChat = {
    type: 1,
    target: { _id: group._id, name: group.name},
    chat,
    lastVisited: new Date()
  }
  for (const userId of users) {
    const user = await User.findById(userId).select('chats').exec()
    user.chats.push(myChat)
    pushNewChat(userId, myChat)
    await user.save()
  }
  return res.success()
})

router.get('/chat/:id', async (req, res, next) => {
  if (!req.session.user) {
    return res.forbidden()
  }
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next()
  }
  const user = await User.findById(req.session.user._id)
      .select('chats').exec()
  const idx = _.findIndex(user.chats, e => e.target.equals(req.params.id))
  if (idx === -1) {
    return res.fail({ type: 'CHAT_NOT_CREATED' })
  }
  if (user.chats[idx].type === 0) {
    const target = await User.findById(req.params.id)
        .select('name lastVisited').exec()
    return res.success({
      _id: target._id,
      name: target.name,
      lastVisited: target.lastVisited,
      type: 0,
      chatId: user.chats[idx].chat
    })
  } else {
    const target = await Group.findById(req.params.id)
        .select('name users').exec()
    return res.success({
      _id: target._id,
      name: target.name,
      users: target.users,
      type: 1,
      chatId: user.chats[idx].chat
    })
  }
})

export default router
