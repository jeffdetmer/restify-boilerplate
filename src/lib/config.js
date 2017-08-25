const config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  baseUrl: process.env.BASE_URL,
  logLevel: process.env.LOG_LEVEL,
  throttle: process.env.THROTTLE === 'true',
  database: {
    postgres: {
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      connectionString: process.env.POSTGRES_CONNECTION,
      database: process.env.POSTGRES_DATABASE,
    },
  },
  sentryDSN: process.env.SENTRY_DSN,
};

export default config;
