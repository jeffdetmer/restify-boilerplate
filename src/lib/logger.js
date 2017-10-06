import bunyan from 'bunyan'
import raven from 'raven'
import sentryStream from 'bunyan-sentry-stream'
import pkg from '../../package'
import Config from './config'

const streams = []
if (!Config.iapiId) {
  streams.push({
    level: Config.logLevel,
    stream: process.stdout,
  })
}

if (Config.sentryDSN) {
  const client = new raven.Client(Config.sentryDSN, {
    release: pkg.version,
    environment: Config.env,
  })
  streams.push(sentryStream(client))
}

const logger = bunyan.createLogger({
  name: pkg.name,
  src: true,
  serializers: {
    req: bunyan.stdSerializers.req,
    res: bunyan.stdSerializers.res,
    err: bunyan.stdSerializers.err,
  },
  env: Config.env,
  streams,
})

export default logger
