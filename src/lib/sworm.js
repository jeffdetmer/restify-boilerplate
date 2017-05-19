import sworm from 'sworm';
import Config from './config';

const config = {
  driver: 'mysql',
  config: {
    user: Config.get('/database/mysql/username'),
    password: Config.get('/database/mysql/password'),
    connectString: Config.get('/database/mysql/connectionString'),
  },
};

const db = sworm.db(config);

async function getConnection() {
  await db.connect();
  return db;
}

export default { getConnection };
