import appPkg from '../../package'

function get(req, res, next) {
  res.send({appVersion: appPkg.version})
  next()
}

export default {get}
