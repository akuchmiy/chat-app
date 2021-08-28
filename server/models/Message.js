const { Schema, model } = require('mongoose')

const message = new Schema({
  user: {
    id: {type: Schema.Types.ObjectId, required: true, ref: 'User'},
    username: {type: String, required: true}
  },
  room: { type: Schema.Types.ObjectId, required: true, ref: 'Room' },
  text: { type: String, required: true },
  date: { type: Date, default: Date.now },
})

const Message = model('Message', message)

module.exports = Message
