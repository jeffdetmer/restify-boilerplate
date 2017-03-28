import database from './lib/database';
import logger from './lib/logger';
import Config from './lib/config';
import server from './server';

process.on('uncaughtException', (err) => {
  logger.error(`Caught exception: \n${err.stack}` || JSON.stringify(err));
  logger.error('Exiting...');
  database.shutdown();
  process.exit(1);
});

['SIGTERM', 'SIGINT'].forEach((sig) => {
  process.on(sig, () => {
    logger.info(`${sig} received`);
    logger.info('Exiting...');
    database.shutdown();
    process.exit(1);
  });
});

process.on('exit', () => {
  logger.info('Shutting down');
  database.shutdown();
  process.exit(1);
});

database
  .connect()
  .then(() => {
    server.listen(Config.get('/port/api'), () => {
      logger.info(`Server is listening on port ${Config.get('/port/api')}`);
    });
  })
  .catch((err) => {
    logger.error(err);
    logger.info('Shutting down');
    database.shutdown();
    process.exit(1);
  });

export default server;
