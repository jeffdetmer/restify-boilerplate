import path from 'path'
import joi from 'joi'
import appConfig from '../../lib/config'
import utils from './utils'

if (appConfig.NODE_ENV === 'test') {
  import('dotenv/config') // eslint-disable-line no-unused-vars
}

const envVarsSchema = joi
  .object({
    ORACLE_URI: joi.string().required(),
    ORACLE_USERNAME: joi.string().required(),
    ORACLE_PASSWORD: joi.string().required(),
    ORACLE_CONNECTION_CLASS: joi.string().required(),
    ORACLE_POOL_MIN: joi
      .number()
      .integer()
      .default(1),
    ORACLE_POOL_MAX: joi
      .number()
      .integer()
      .default(20),
    ORACLE_POOL_INCREMENT: joi
      .number()
      .integer()
      .default(1),
    ORACLE_POOL_TIMEOUT: joi
      .number()
      .integer()
      .default(10),
    ORACLE_MAX_ROWS: joi
      .number()
      .integer()
      .default(500),
    ORACLE_HEALTH_CHECK_TIMEOUT: joi
      .number()
      .integer()
      .default(2000),
  })
  .unknown()
  .required()

const envVars = joi.attempt(process.env, envVarsSchema)

const config = {
  client: 'oracledb',
  connection: {
    password: envVars.ORACLE_PASSWORD,
    user: envVars.ORACLE_USERNAME,
    connectString: envVars.ORACLE_URI,
    connectionClass: envVars.ORACLE_CONNECTION_CLASS,
  },
  pool: {
    min: envVars.ORACLE_POOL_MIN,
    max: envVars.ORACLE_POOL_MAX,
    increment: envVars.ORACLE_POOL_INCREMENT,
    timeout: envVars.ORACLE_POOL_TIMEOUT,
  },
  migrations: {
    directory: path.join(__dirname, './migrations'),
  },
  healthCheck: {
    timeout: envVars.ORACLE_HEALTH_CHECK_TIMEOUT,
  },
  wrapIdentifier: value => utils.convertToSnakeCase(value),
}

export default config
