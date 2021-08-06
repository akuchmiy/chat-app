const User = require('../../../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

function errorMessage(res, status, message) {
  res.status(status).json({ message })
}

const authController = {
  async registerUser(req, res) {
    try {
      const { username, password } = req.body
      const candidate = await User.findOne({ username })
      if (candidate) {
        return errorMessage(res, 400, 'User with that username already exists')
      }
      const hashedPassword = bcrypt.hashSync(password, 7)
      const user = new User({ username, password: hashedPassword })
      await user.save()
      return res.status(200).json(user)
    } catch (e) {
      console.log(e)
      return errorMessage(res, 400, 'Registration error.')
    }
  },
  async loginUser(req, res) {
    try {
      const { username, password } = req.body
      const candidate = await User.findOne({ username })
      if (!candidate)
        return errorMessage(res, 400, "User with that username doesn't exist")

      const matches = bcrypt.compareSync(password, candidate.password)
      if (!matches) return errorMessage(res, 400, 'Invalid password')

      const payload = {
        sub: candidate._id,
      }
      const token = jwt.sign(payload, process.env.SECRET_KEY)
      return res.status(200).json({ token })
    } catch (e) {
      console.log(e)
      return errorMessage(res, 400, 'Login error')
    }
  },
}

module.exports = authController
