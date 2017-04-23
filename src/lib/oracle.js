import oracledb from 'oracledb';
import Config from './config';
import logger from './logger';

let connection;

oracledb.autoCommit = true;

const config = {
  user: Config.get('/database/username'),
  password: Config.get('/database/password'),
  connectionString: Config.get('/database/uri'),
  poolMax: Config.get('/database/pool/max'),
  poolMin: Config.get('/database/pool/min'),
  poolIncrement: Config.get('/database/pool/increment'),
  poolTimeout: Config.get('/database/pool/timeout'),
  connectionClass: Config.get('/database/connectionClass'),
};

async function connect() {
  try {
    connection = await oracledb.getConnection(config);
  } catch (err) {
    logger.error(err);
  }
}

function getConnection() {
  return connection;
}

function shutdown() {
  return connection.close();
}

export default { connect, getConnection, shutdown };
