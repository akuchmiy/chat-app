const wrapper = (io) => {
  return function onConnection(socket) {
    console.log('Connected - ', io, socket)
  }
}

module.exports = wrapper
