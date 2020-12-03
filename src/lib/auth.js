import jwt from 'jsonwebtoken'
import config from '../lib/config'

const sign = async user => {
  await jwt.sign(user, config.JWT_SECRET)
}

const verify = async token => {
  await jwt.verify(token, config.JWT_SECRET)
}

export default { sign, verify }
