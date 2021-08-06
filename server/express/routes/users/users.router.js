const { Router } = require('express')
const authMiddleware = require('../../middleware/authMiddleware')
const controller = require('./users.controller')

const router = Router()

router.use(authMiddleware)
router.get('/', controller.getAllUsers)
router.get('/:userId', controller.getUser)
router.get('/:userId/rooms', controller.getUserRooms)

module.exports = router
