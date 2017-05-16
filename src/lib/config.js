import Confidence from 'confidence';

const internals = {
  criteria: {
    env: process.env.NODE_ENV,
  },
};

internals.config = {
  $meta: 'API configuration file',
  env: process.env.NODE_ENV,
  port: {
    api: {
      $filter: 'env',
      local: 8000,
      test: 9000,
      $default: process.env.PORT,
    },
  },
  baseUrl: {
    $filter: 'env',
    $meta: 'values should not end in "/"',
    production: 'https://example',
    $default: 'http://127.0.0.1:8000',
  },
  logLevel: {
    $filter: 'env',
    production: process.env.LOG_LEVEL,
    $default: 'debug',
  },
  database: {
    oracle: {
      $filter: 'env',
      local: {
        username: '',
        password: '',
        connectionString: '', // host:port/servicename
        connectionClass: '',
        pool: {
          max: 50,
          min: 5,
          increment: 1,
          timeout: 10,
        },
      },
      $default: {
        username: process.env.ORACLE_USER,
        password: process.env.ORACLE_PASSWORD,
        connectionString: process.env.ORACLE_URI,
        connectionClass: process.env.ORACLE_CONNECTION_CLASS,
        pool: {
          max: Number(process.env.ORACLE_POOL_MAX),
          min: Number(process.env.ORACLE_POOL_MIN),
          increment: Number(process.env.ORACLE_POOL_INCREMENT),
          timeout: Number(process.env.ORACLE_POOL_TIMEOUT),
        },
      },
    },
  },
};

internals.store = new Confidence.Store(internals.config);

exports.get = (key) => internals.store.get(key, internals.criteria);

exports.meta = (key) => internals.store.meta(key, internals.criteria);
