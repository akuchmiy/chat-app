const { Schema, model } = require('mongoose')

const room = new Schema({
  name: { type: String, required: true },
  users: [{
    id: {type: Schema.Types.ObjectId, ref: 'User'},
    username: {type: String}
  }],
})

const Room = model('Room', room)

module.exports = Room
