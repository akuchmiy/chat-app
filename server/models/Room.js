const { Schema, model } = require('mongoose')

const room = new Schema({
  name: { type: String, required: true },
  users: [{ type: String, ref: 'User', default: [] }],
})

const Room = model('Room', room)

module.exports = Room
