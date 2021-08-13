const onRoomConnection = require('./onRoomConnection')
const onMessage = require('./onMessage')
const onUserLeaving = require('./onUserLeaving')

const wrapper = (io) => {
  return (socket) => {
    onRoomConnection(io, socket)
    onMessage(io, socket)
    onUserLeaving(io, socket)
  }
}

module.exports = wrapper
