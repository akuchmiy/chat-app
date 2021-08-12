const onRoomConnection = require('./onRoomConnection')
const onMessage = require('./onMessage')

const wrapper = (io) => {
  return (socket) => {
    onRoomConnection(io, socket)
    onMessage(io, socket)
  }
}

module.exports = wrapper
