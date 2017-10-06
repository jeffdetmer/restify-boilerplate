import dotenv from 'dotenv/config' // eslint-disable-line no-unused-vars

const config = {
  env: process.env.NODE_ENV,
  port: Number(process.env.PORT),
  baseUrl: process.env.BASE_URL,
  logLevel: process.env.LOG_LEVEL,
  throttle: process.env.THROTTLE === 'true',
  database: {
    postgres: {
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      connectionString: process.env.POSTGRES_CONNECTION,
      database: process.env.POSTGRES_DATABASE,
      pool: {
        max: Number(process.env.POSTGRES_POOL_MAX),
        min: Number(process.env.POSTGRES_POOL_MIN),
        idle: Number(process.env.POSTGRES_POOL_IDLE),
      },
    },
  },
  sentryDSN: process.env.SENTRY_DSN,
}

export default config
