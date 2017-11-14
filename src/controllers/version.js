function get(req, res, next) {
  res.send({appVersion: '1.0.0'})
  next()
}

export default {get}
