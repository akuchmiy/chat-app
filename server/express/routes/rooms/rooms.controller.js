const {Room, User, Message} = require('../../../models')

const roomController = {
  // route: GET /rooms
  async getAllRooms(req, res) {
    try {
      const rooms = await Room.find({})
      if (!rooms)
        return res.status(204)

      return res.status(200).json(rooms)
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

      return res.status(200).json(room)
    } catch (e) {
      return res.status(500).json({ message: 'Unexpected server error ' + e })
    }
  },
  // route: GET /rooms/:roomId
  async getRoom(req, res) {
    try {
      const room = req.resource

      return res.status(200).json(room)
    } catch (e) {
      return res.status(500).json({ message: 'Unexpected server error ' + e })
    }
  },
  // route: GET /rooms/:roomId/users
  async getRoomUsers(req, res) {
    try {
      const room = req.resource

      return res.status(200).json({ _id: room._id, data: room.users })
    } catch (e) {
      return res.status(500).json({ message: 'Unexpected server error ' + e })
    }
  },
  // route: POST /rooms/:roomId/users
  async postRoomUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.userId })
      const room = req.resource

      for (let i = 0; i < user.rooms.length; i++) {
        if (user.rooms[i].id.toString() === room._id.toString())
          return res.status(400).json({message: 'This User is already a participant of the room'})
      }

      room.users.push({id: user._id, username: user.username})
      await room.save()
      user.rooms.push({id: room._id, name: room.name})
      await user.save()

      return res.status(200).json(room)
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
        return res.status(204)

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
