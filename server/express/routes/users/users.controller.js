const User = require('../../../models/User')

const userController = {
  // route: GET /users
  async getAllUsers(req, res) {
    try {
      const users = await User.find({}, ['_id', 'username', 'rooms'])
      if (!users)
        return res
          .status(204)
          .json({ message: 'There are no users yet.', data: null })

      return res.status(200).json({ data: users })
    } catch (e) {
      return res.status(500).json({ message: 'Unexpected server error ' + e })
    }
  },
  // route: GET /users/:userID
  async getUser(req, res) {
    try {
      const userId = req.params.userId
      const user = await User.findOne({ _id: userId }, [
        '_id',
        'username',
        'rooms',
      ])
      if (!user)
        return res
          .status(204)
          .json({ message: 'There is no user with such id', data: null })

      return res.status(200).json({ data: user })
    } catch (e) {
      return res.status(500).json({ message: 'Unexpected server error ' + e })
    }
  },
  async getUserRooms(req, res) {
    try {
      const userId = req.params.userId
      const user = await User.findOne({ _id: userId }, ['_id', 'rooms'])
      if (!user)
        return res
          .status(204)
          .json({ message: 'There is no user with such id', data: null })

      if (!user.rooms)
        return res
          .status(204)
          .json({ message: 'User doesn\'t attend any rooms', data: null })

      return res
        .status(200)
        .json({ data: { _id: user._id, rooms: user.rooms } })
    } catch (e) {
      return res.status(500).json({ message: 'Unexpected server error ' + e })
    }
  },
}

module.exports = userController
