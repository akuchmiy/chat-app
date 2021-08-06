const { Schema, model } = require('mongoose')

const message = new Schema({
  user: { type: String, required: true, ref: 'User' },
  room: { type: String, required: true, ref: 'Room' },
  text: { type: String, required: true },
  date: { type: Date, default: Date.now },
})

const Message = model('Message', message)

module.exports = Message
