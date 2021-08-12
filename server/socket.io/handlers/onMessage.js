module.exports = function onMessage(io, socket) {
  socket.on("message", (data) => {
    const room = socket.currentRoom
    socket.to(room).emit("message", data)
  })
}