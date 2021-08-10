const wrapper = (io) => {
  return (socket) => {
    socket.on("connect to room", (userId, nextRoomId, cb) => {
      const prevRoom = socket.currentRoom
      if (prevRoom) {
        socket.to(prevRoom).emit("user leaving", userId)
        socket.leave(prevRoom)
      }
      socket.join(nextRoomId)
      socket.currentRoom = nextRoomId
      cb(prevRoom)
    })

    socket.on("message", (data) => {
      const room = socket.currentRoom
      socket.to(room).emit("message", data)
    })
  }
}

module.exports = wrapper
