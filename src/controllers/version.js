import appPkg from '../../package.json';

function get(req, res, next) {
  res.send({ appVersion: appPkg.version });
  next();
}

export default { get };
