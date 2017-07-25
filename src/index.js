import logger from './lib/logger';
import Config from './lib/config';
import server from './server';

process.on('uncaughtException', async (err) => {
  logger.error(`Caught exception: \n${err.stack}` || JSON.stringify(err));
  logger.error('Exiting...');
  process.exit(1);
});

['SIGTERM', 'SIGINT'].forEach((sig) => {
  process.on(sig, async () => {
    logger.info(`${sig} received`);
    logger.info('Exiting...');
    process.exit(1);
  });
});

process.on('exit', async () => {
  logger.info('Shutting down');
  process.exit(1);
});

const startServer = async () => {
  try {
    await server.listen(Config.port);
    logger.info(`Server is listening on port ${Config.port}`);
  } catch (err) {
    logger.error(err);
    logger.info('Shutting down');
    process.exit(1);
  }
};

startServer();

export default server;
