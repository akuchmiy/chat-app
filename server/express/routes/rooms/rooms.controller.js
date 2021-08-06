const Room = require('../../../models/Room')
const User = require('../../../models/User')
// const Message = require('../../../models/Message')

const roomController = {
  async getAllRooms(req, res) {
    try {
      const rooms = await Room.find({})
      if (!rooms)
        return res
          .status(204)
          .json({ message: 'There are no rooms yet.', data: null })

      return res.status(200).json({ data: rooms })
    } catch (e) {
      return res.status(500).json({ message: 'Enexpected server error ' + e })
    }
  },
  async getRoom(req, res) {
    try {
      const roomId = req.params.roomId
      const room = await Room.findOne({ _id: roomId })
      if (!room)
        return res
          .status(204)
          .json({ message: 'There is no room with such id', data: null })

      return res.status(200).json({ data: room })
    } catch (e) {
      return res.status(500).json({ message: 'Enexpected server error ' + e })
    }
  },
  async postRoom(req, res) {
    try {
      const { name } = req.body
      const room = new Room({ name, users: [req.userId] })
      const user = await User.findOne({ _id: req.userId })

      await room.save()
      const roomId = room._id
      user.rooms.push(roomId)
      await user.save()

      return res.status(200).json({ data: room })
    } catch (e) {
      return res.status(500).json({ message: 'Enexpected server error ' + e })
    }
  },
}

module.exports = roomController
