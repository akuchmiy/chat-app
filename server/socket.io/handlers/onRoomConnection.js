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
    socket.join(nextRoomId)
    socket.to(nextRoomId).emit('user connected', userId)
    socket.currentRoom = nextRoomId
    const socketsIdsInRoom = io.sockets.adapter.rooms.get(nextRoomId)
    const userIds = getUserIdsFromSockets(io, socketsIdsInRoom)
    cb(userIds)
  })
}