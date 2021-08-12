function getUserIdsFromSockets(io, socketIds) {
  const ids = []
  for (let socketId of socketIds) {
    const socket = io.sockets.sockets.get(socketId);
    ids.push(socket.userId)
  }
  return ids
}

module.exports = function onRoomConnection(io, socket) {
  socket.on("connect to room", (userId, nextRoomId, cb) => {
    socket.userId = userId
    const prevRoom = socket.currentRoom
    if (prevRoom) {
      socket.to(prevRoom).emit("user leaving", userId)
      socket.leave(prevRoom)
    }
    socket.join(nextRoomId.toString())
    socket.currentRoom = nextRoomId
    const socketsIdsInRoom = io.sockets.adapter.rooms.get(nextRoomId.toString())
    const userIds = getUserIdsFromSockets(io, socketsIdsInRoom)
    cb(userIds)
  })
}