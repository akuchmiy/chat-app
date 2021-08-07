const User = require('../../../models/User')

const userController = {
  // route: GET /users
  async getAllUsers(req, res) {
    try {
      const users = await User.find({}, ['_id', 'username', 'rooms'])
      if (!users)
        return res.status(204)

      return res.status(200).json({ data: users })
    } catch (e) {
      return res.status(500).json({ message: 'Unexpected server error ' + e })
    }
  },
  // route: GET /users/:userID
  async getUser(req, res) {
    try {
      const user = req.resource

      return res.status(200).json({ data: user })
    } catch (e) {
      return res.status(500).json({ message: 'Unexpected server error ' + e })
    }
  },
  async getUserRooms(req, res) {
    try {
      const user = req.resource

      if (!user.rooms)
        return res.status(204)

      return res
        .status(200)
        .json({ data: { _id: user._id, rooms: user.rooms } })
    } catch (e) {
      return res.status(500).json({ message: 'Unexpected server error ' + e })
    }
  },
}

module.exports = userController
