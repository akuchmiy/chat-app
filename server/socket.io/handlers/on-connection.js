const wrapper = (io) => {
  return (socket) => {
    socket.on("connect to room", (userId, prevRoomId, nextRoomId, cb) => {
      socket.to(prevRoomId).emit("user leaving", userId)
      socket.leave(prevRoomId)
      socket.join(nextRoomId)
      socket.currentRoom = nextRoomId
      cb(nextRoomId)
    })

    socket.on("message", () => {
      const room = socket.currentRoom
      socket.to(room).emit("message")
    })
  }
}

module.exports = wrapper
