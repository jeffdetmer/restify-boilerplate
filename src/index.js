import logger from './lib/logger';
import Config from './lib/config';
import server from './server';

const app = server;

process.on('uncaughtException', async (err) => {
  logger.error(`Caught exception: \n${err.stack}` || JSON.stringify(err));
  logger.error('Exiting...');
  await app.close();
  process.exit(1); // eslint-disable-line no-process-exit
});

['SIGTERM', 'SIGINT', 'SIGKILL'].forEach((sig) => {
  process.on(sig, async () => {
    logger.info(`${sig} received`);
    logger.info('Exiting...');
    await app.close();
    process.exit(1); // eslint-disable-line no-process-exit
  });
});

process.on('exit', async () => {
  logger.info('Shutting down');
  await app.close();
  process.exit(1); // eslint-disable-line no-process-exit
});

const startServer = async () => {
  try {
    await app.listen(Config.port);
    logger.info(`Server is listening on port ${Config.port}`);
  } catch (err) {
    logger.error(err);
    logger.info('Shutting down');
    process.exit(1); // eslint-disable-line no-process-exit
  }
};

export { app, logger, startServer };
