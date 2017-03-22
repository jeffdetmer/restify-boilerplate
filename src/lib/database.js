import sworm from 'sworm';  // https://github.com/featurist/sworm
import Config from './config';

const config = {
  driver: Config.get('/database/driver'),
  config: {
    filename: Config.get('/database/uri'),
  },
};

const db = sworm.db(config);

export default db;
