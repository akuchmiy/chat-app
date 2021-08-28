const mongoose = require('mongoose')

function resourceCheck(resourceName, Resource, requestParam, fieldsToRetrieve) {
  return async function middleware(req, res, next) {
    try {
      const param = req.params[requestParam]
      if (!mongoose.Types.ObjectId.isValid(param))
        return res
          .status(400)
          .json({ message: `This id is not valid` })
      const resource = await Resource.findOne({ _id: param }, fieldsToRetrieve)
      if (!resource)
        return res
          .status(400)
          .json({ message: `There is no ${resourceName} with such id` })
      req.resource = resource
      next()
    } catch(e) {
      return res.status(500)
    }
  }
}

module.exports = resourceCheck