const { Schema, model } = require('mongoose')

const user = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  rooms: [{ type: String, ref: 'Room', default: [] }],
})

const User = model('User', user)

module.exports = User
