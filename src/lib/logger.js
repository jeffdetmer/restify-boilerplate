// TODO: Convert from Bunyan to Pino Logger
import bunyan from 'bunyan'
import raven from 'raven'
import sentryStream from 'bunyan-sentry-stream'
import pkg from '../../package'
import config from './config'

const streams = []
streams.push({
  level: config.LOGGER_LEVEL,
  stream: process.stdout,
})

const client = new raven.Client(config.SENTRY_DSN, {
  release: pkg.version,
  environment: config.NODE_ENV,
})
streams.push(sentryStream(client))

const logger = bunyan.createLogger({
  name: pkg.name,
  src: true,
  serializers: {
    req: bunyan.stdSerializers.req,
    res: bunyan.stdSerializers.res,
    err: bunyan.stdSerializers.err,
  },
  env: config.NODE_ENV,
  streams,
})

export default logger
