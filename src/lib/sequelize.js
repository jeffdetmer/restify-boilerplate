import Sequelize from 'sequelize';
import Config from './config';
import logger from './logger';

const config = {
  host: Config.database.postgres.connectionString,
  dialect: 'postgres',
  pool: {
    max: 10,
    min: 0,
    idle: 10000,
  },
  username: Config.database.postgres.username,
  password: Config.database.postgres.password,
  database: Config.database.postgres.database,
  logging: logger.debug.bind(logger),
};

const sequelize = new Sequelize(config);

export default sequelize;
