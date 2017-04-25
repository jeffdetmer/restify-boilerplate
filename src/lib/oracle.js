import oracledb from 'oracledb';
import Config from './config';
import logger from './logger';

let pool;

oracledb.autoCommit = true;

const config = {
  user: Config.get('/database/oracle/username'),
  password: Config.get('/database/oracle/password'),
  connectionString: Config.get('/database/oracle/uri'),
  poolMax: Config.get('/database/oracle/pool/max'),
  poolMin: Config.get('/database/oracle/pool/min'),
  poolIncrement: Config.get('/database/oracle/pool/increment'),
  poolTimeout: Config.get('/database/oracle/pool/timeout'),
  connectionClass: Config.get('/database/oracle/connectionClass'),
};

async function connect() {
  try {
    pool = await oracledb.createPool(config);
  } catch (err) {
    logger.error(err);
  }
}

async function getConnection() {
  let conn;
  try {
    conn = await pool.getConnection();
  } catch (err) {
    logger.error(err);
  }
  return conn;
}

function shutdown() {
  return pool.close();
}

async function execute(query) {
  let connection;
  let result;
  try {
    connection = await this.getConnection();
    result = await connection.execute(query, [], {
      outFormat: oracledb.OBJECT,
      resultSet: true,
    });
    await connection.release();
  } catch (err) {
    logger.error(err);
  }
  return result;
}

export default { connect, getConnection, shutdown, execute };
