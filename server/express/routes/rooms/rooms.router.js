const { Router } = require('express')
const authMiddleware = require('../../middleware/authMiddleware')
const controller = require('./rooms.controller')
const router = Router()

router.use(authMiddleware)

router.get('/', controller.getAllRooms)
router.post('/', controller.postRoom)

router.get('/:roomId', controller.getRoom)

router.get('/:roomId/users', controller.getRoomUsers)
router.post('/:roomId/users', controller.postRoomUser)

router.get('/:roomId/messages', controller.getRoomMessages)
router.post('/:roomId/messages', controller.postRoomMessage)

module.exports = router
