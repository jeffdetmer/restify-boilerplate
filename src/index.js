import semver from 'semver'
import pkg from '../package'
import logger from './lib/logger'
import config from './lib/config'
import server from './server'
import db from './models/db'

// validate Node version requirement
const runtime = {
  expected: semver.validRange(pkg.engines.node),
  actual: semver.valid(process.version),
}

const valid = semver.satisfies(runtime.actual, runtime.expected)
if (!valid) {
  throw new Error(
    `Expected Node.js version ${runtime.expected}, but found v${
      runtime.actual
    }. Please update or change your runtime!`,
  )
}

const app = server

let shuttingDown = false
const gracefulShutdown = async (sig = 'SIGTERM') => {
  if (shuttingDown) {
    return
  }

  shuttingDown = true
  try {
    await db.destroy()
    await app.close()
  } catch (err) {
    logger.error(`Error occurred during graceful shutdown`, err)
    process.exit(1) // eslint-disable-line no-process-exit
  }
  logger.info('Graceful shutdown complete')
  process.kill(process.pid, sig) // eslint-disable-line no-process-exit
}

process
  .on('uncaughtException', async err => {
    logger.error(`Caught exception: \n${err.stack}` || JSON.stringify(err))
    await gracefulShutdown()
  })
  .on('SIGTERM', async sig => {
    logger.info('SIGTERM intercepted, starting graceful shutdown')
    await gracefulShutdown(sig)
  })
  .on('SIGINT', async sig => {
    logger.info('SIGINT intercepted, starting graceful shutdown')
    await gracefulShutdown(sig)
  })
  .on('SIGUSR2', async sig => {
    logger.info('SIGUSR2 intercepted. starting graceful shutdown')
    await gracefulShutdown(sig)
  })

process.on('exit', gracefulShutdown)

const startServer = async () => {
  try {
    await app.listen(config.PORT)
    logger.info(`Starting process`, {pid: process.pid})
    logger.info(`Listening on port`, {port: config.PORT})
  } catch (err) {
    logger.error(err)
    logger.info('Shutting down')
    process.exit(1) // eslint-disable-line no-process-exit
  }
}

export {app, logger, startServer}
