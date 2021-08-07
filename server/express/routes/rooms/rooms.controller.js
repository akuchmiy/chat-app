const Room = require('../../../models/Room')
const User = require('../../../models/User')
const Message = require('../../../models/Message')

const roomController = {
  // route: GET /rooms
  async getAllRooms(req, res) {
    try {
      const rooms = await Room.find({})
      if (!rooms)
        return res
          .status(204)
          .json({ message: 'There are no rooms yet.', data: null })

      return res.status(200).json({ data: rooms })
    } catch (e) {
      return res.status(500).json({ message: 'Unexpected server error ' + e })
    }
  },
  // route: POST /rooms
  async postRoom(req, res) {
    try {
      const { name } = req.body
      const user = await User.findOne({ _id: req.userId })
      const room = new Room({ name, users: [{ id: user._id, username: user.username }] })

      await room.save()
      user.rooms.push({ id: room._id, name: room.name })
      await user.save()

      return res.status(200).json({ data: room })
    } catch (e) {
      return res.status(500).json({ message: 'Unexpected server error ' + e })
    }
  },
  // route: GET /rooms/:roomId
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
      return res.status(500).json({ message: 'Unexpected server error ' + e })
    }
  },
  // route: GET /rooms/:roomId/messages
  async getRoomMessages(req, res) {
    try {
      const roomId = req.params.roomId
      const messages = await Message.find({ room: roomId }).sort([['date', 1]])
      if (!messages)
        return res
          .status(204)
          .json({ message: 'There is no room with such id', data: null })

      return res.status(200).json({ _id: roomId, data: messages })
    } catch(e) {
      return res.status(500).json({ message: 'Unexpected server error ' + e })
    }
  },
  // route: POST /rooms/:roomId/messages
  async postRoomMessage(req, res) {
    try {
      const {text, date} = req.body
      const roomId = req.params.roomId
      const userId = req.userId

      const user = await User.findOne({_id: userId})
      const message = new Message({
        user: {username: user.username, id: user._id},
        room: roomId,
        text,
        date
      })
      await message.save()
      return res.status(200).json(message)
    } catch(e) {
      return res.status(500).json({ message: 'Unexpected server error ' + e })
    }
  },
}

module.exports = roomController
