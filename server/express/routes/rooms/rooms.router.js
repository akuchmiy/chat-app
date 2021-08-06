const { Router } = require('express')
const authMiddleware = require('../../middleware/authMiddleware')
const controller = require('./rooms.controller')
const router = Router()

router.use(authMiddleware)

router.get('/', controller.getAllRooms)
router.post('/', controller.postRoom)

router.get('/:roomId', controller.getRoom)

module.exports = router
