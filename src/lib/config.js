import dotenv from 'dotenv/config' // eslint-disable-line no-unused-vars
import joi from 'joi'

const envVarsSchema = joi
  .object({
    NODE_ENV: joi
      .string()
      .allow(['development', 'production', 'test'])
      .default('production'),
    LOGGER_LEVEL: joi
      .string()
      .allow(['test', 'error', 'warn', 'info', 'verbose', 'debug', 'silly'])
      .when('NODE_ENV', {
        is: 'development',
        then: joi.default('silly'),
      })
      .when('NODE_ENV', {
        is: 'production',
        then: joi.default('info'),
      })
      .when('NODE_ENV', {
        is: 'test',
        then: joi.default('warn'),
      }),
    PORT: joi
      .number()
      .integer()
      .default(80),
    SENTRY_DSN: joi.string(),
  })
  .unknown()
  .required()

const envVars = joi.attempt(process.env, envVarsSchema)

export default envVars
