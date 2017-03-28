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
      test: 9000,
      production: process.env.PORT,
      $default: 8000,
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
    $filter: 'env',
    production: {
      username: '',
      password: '',
    },
    $default: {
      username: '',
      password: '',
    },
  },
};

internals.store = new Confidence.Store(internals.config);

exports.get = (key) => internals.store.get(key, internals.criteria);

exports.meta = (key) => internals.store.meta(key, internals.criteria);
