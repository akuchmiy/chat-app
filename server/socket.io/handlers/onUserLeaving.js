module.exports = function onUserLeaving(io, socket) {
  socket.on('user leaving', userId => {
    socket.to(socket.currentRoom).emit('user leaving', userId)
    socket.leave(socket.currentRoom)
    socket.currentRoom = null
  })

  socket.on("disconnecting", (reason) => {
    socket.to(socket.currentRoom).emit('user leaving', socket.userId)
    socket.leave(socket.currentRoom)
  })
}