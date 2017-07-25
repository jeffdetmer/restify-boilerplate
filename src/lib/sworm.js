import sworm from 'sworm';
import Config from './config';

const config = {
  driver: 'mysql',
  config: {
    user: Config.database.mysql.username,
    password: Config.database.mysql.password,
    connectString: Config.database.mysql.connectionString,
  },
};

async function getConnection() {
  const db = sworm.db(config);
  await db.connect();
  return db;
}

export default { getConnection };
