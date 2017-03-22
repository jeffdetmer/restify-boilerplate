import logger from './lib/logger';
import Config from './lib/config';
import server from './server';
import database from './lib/database';

process.on('uncaughtException', (err) => {
  logger.error(`Caught exception: \n${err.stack}` || JSON.stringify(err));
  logger.error('Closing database connection...');
  database.close();
  logger.error('Exiting...');
  process.exit(1);
});

['SIGTERM', 'SIGINT'].forEach((sig) => {
  process.on(sig, () => {
    logger.info(`${sig} received`);
    logger.info('Closing database connection...');
    database.close();
    logger.info('Exiting...');
    process.exit(1);
  });
});

process.on('exit', () => {
  logger.info('Closing database connection...');
  database.close();
  logger.info('Shutting down');
  process.exit(1);
});

database.connect().then(() => {
  server.listen(Config.get('/port/api'), () => {
    logger.info(`Server is listening on port ${Config.get('/port/api')}`);
  });
});


export default server;
