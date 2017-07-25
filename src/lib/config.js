const config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  baseUrl: process.env.BASE_URL,
  logLevel: process.env.LOG_LEVEL,
  throttle: process.env.THROTTLE === 'true',
  database: {
    mysql: {
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      connectionString: process.env.MYSQL_CONNECTION,
    },
  },
};

export default config;
