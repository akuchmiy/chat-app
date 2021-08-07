function resourceCheck(resourceName, Resource, requestParam, fieldsToRetrieve) {
  return async function middleware(req, res, next) {
    const param = req.params[requestParam]
    const resource = await Resource.findOne({ _id: param }, fieldsToRetrieve)
    if (!resource)
      return res
        .status(400)
        .json({ message: `There is no ${resourceName} with such id` })
    req.resource = resource
    next()
  }
}

module.exports = resourceCheck