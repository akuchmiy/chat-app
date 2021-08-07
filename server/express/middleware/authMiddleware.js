const jwt = require('jsonwebtoken')

function authCheck(req, res, next) {
  if (req.method === 'OPTIONS') return next()

  try {
    const token = req.get('Authorization').split(' ')[1]
    const data = jwt.verify(token, process.env.SECRET_KEY)
    req.userId = data.id
    next()
  } catch (e) {
    res.status(403).json({ message: 'Unauthorized' })
  }
}

module.exports = authCheck
