const { Schema, model } = require('mongoose')

const user = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  rooms: [{
    id: {type: Schema.Types.ObjectId, ref: 'Room'},
    name: {type: String},
  }],
})

const User = model('User', user)

module.exports = User
