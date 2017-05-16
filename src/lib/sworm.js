import sworm from 'sworm';
import Config from './config';

const config = {
  driver: 'mysql',
  config: {
    user: Config.get('/database/mysql/username'),
    password: Config.get('/database/mysql/password'),
    connectString: Config.get('/database/mysql/connectionString'),
    pool: true,
    options: {
      poolMax: Number(Config.get('/database/mysql/pool/max')),
      poolMin: Number(Config.get('/database/mysql/pool/min')),
      poolIncrement: Number(Config.get('/database/mysql/pool/increment')),
      poolTimeout: Number(Config.get('/database/mysql/pool/timeout')),
    },
  },
};

const db = sworm.db(config);

async function getConnection() {
  await db.connect();
  return db;
}

export default { getConnection };
