const { User } = require('../../../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')

function generateAccessToken(id) {
  const payload = { id }
  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '24h' })
}

const authController = {
  async registerUser(req, res) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Registration error', errors })
      }
      const { username, password } = req.body
      const candidate = await User.findOne({ username })
      if (candidate) {
        return res
          .status(400)
          .json({ message: 'User with that username already exists' })
      }
      const hashedPassword = bcrypt.hashSync(password, 7)
      const user = new User({ username, password: hashedPassword, rooms: [] })
      await user.save()
      return res.status(200).json(user)
    } catch (e) {
      console.log(e)
      return res.status(400).json({ message: 'Registration error.' })
    }
  },
  async loginUser(req, res) {
    try {
      const { username, password } = req.body
      const candidate = await User.findOne({ username })
      if (!candidate)
        return res
          .status(400)
          .json({ message: 'User with that username doesn\'t exist' })

      const matches = bcrypt.compareSync(password, candidate.password)
      if (!matches) return res.status(400).json({ message: 'Invalid password' })

      const token = generateAccessToken(candidate._id)
      return res.status(200).json({ id: candidate._id, token })
    } catch (e) {
      console.log(e)
      return res.status(400).json({ message: 'Login error' })
    }
  },
}

module.exports = authController
