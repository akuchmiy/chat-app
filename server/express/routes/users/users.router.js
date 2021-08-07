const { Router } = require('express')
const authMiddleware = require('../../middleware/authMiddleware')
const resourceMiddleware = require('../../middleware/resourceMiddleware')
const {User} = require('../../../models')
const controller = require('./users.controller')

function userResourceMiddleware(fieldsToRetrieve) {
  return resourceMiddleware('user', User, 'userId', fieldsToRetrieve)
}

const router = Router()

router.use(authMiddleware)
router.get('/', controller.getAllUsers)
router.get('/:userId', [
  userResourceMiddleware('_id username rooms')
], controller.getUser)
router.get('/:userId/rooms', [
  userResourceMiddleware('_id rooms')
], controller.getUserRooms)

module.exports = router
