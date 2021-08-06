const express = require('express')
const { check } = require('express-validator')
const controller = require('./auth.controller')

const router = express.Router()

router.post(
  '/register',
  [
    check('username', 'Username must not be empty!').notEmpty(),
    check('password', 'Minimal password length is 8').isLength({ min: 8 }),
  ],
  controller.registerUser
)
router.post('/login', controller.loginUser)

module.exports = router
