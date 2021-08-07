const { Router } = require('express')
const authMiddleware = require('../../middleware/authMiddleware')
const resourceMiddleware = require('../../middleware/resourceMiddleware')
const {Room} = require('../../../models')
const controller = require('./rooms.controller')
const router = Router()

function roomResourceMiddleware() {
  return resourceMiddleware('room', Room, 'roomId', '_id users name')
}

router.use(authMiddleware)

router.get('/', controller.getAllRooms)
router.post('/', controller.postRoom)

router.get('/:roomId',[
  roomResourceMiddleware()
], controller.getRoom)

router.get('/:roomId/users',[
  roomResourceMiddleware()
], controller.getRoomUsers)
router.post('/:roomId/users', [
  roomResourceMiddleware()
], controller.postRoomUser)

router.get('/:roomId/messages', [
  roomResourceMiddleware()
], controller.getRoomMessages)
router.post('/:roomId/messages', controller.postRoomMessage)

module.exports = router
