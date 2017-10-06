function get(req, res, next) {
  res.send(req.params.name)
  return next()
}

function post(req, res, next) {
  res.setHeader('Content-Type', req.contentType())
  res.send(req.body)
  return next()
}

export default {get, post}
