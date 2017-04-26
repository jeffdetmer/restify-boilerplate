module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    {
      name: 'microservice-boilerplate',
      script: './dist/index.js',
      env: {
        NODE_ENV: 'local',
        LD_LIBRARY_PATH: '/usr/local/lib64:$LD_LIBRARY_PATH',
        PORT: 10000,
        ORACLE_USER: '',
        ORACLE_PASSWORD: '',
        ORACLE_URI: '', // host:port/servicename
        ORACLE_CONNECTION_CLASS: '',
        ORACLE_POOL_MAX: 10,
        ORACLE_POOL_MIN: 1,
        ORACLE_POOL_INCREMENT: 1,
        ORACLE_POOL_TIMEOUT: 10,
      },
      env_production: {
        NODE_ENV: 'production',
        LD_LIBRARY_PATH: '/usr/local/lib64:$LD_LIBRARY_PATH',
        PORT: 10000,
        ORACLE_USER: '',
        ORACLE_PASSWORD: '',
        ORACLE_URI: '', // host:port/servicename
        ORACLE_CONNECTION_CLASS: '',
        ORACLE_POOL_MAX: 50,
        ORACLE_POOL_MIN: 1,
        ORACLE_POOL_INCREMENT: 1,
        ORACLE_POOL_TIMEOUT: 10,
      },
    },
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy: {
    production: {
      user: 'node',
      host: '',
      ref: 'origin/master',
      repo: 'git@github.com:shellthor/microservice-boilerplate.git',
      path: '/var/www/production',
      'post-deploy': 'yarn install && pm2 startOrRestart ecosystem.config.js --env production',
    },
    dev: {
      user: 'node',
      host: '',
      ref: 'origin/master',
      repo: 'git@github.com:shellthor/microservice-boilerplate.git',
      path: '/var/www/development',
      'post-deploy': 'yarn install && pm2 startOrRestart ecosystem.config.js --env dev',
      env: {
        NODE_ENV: 'dev',
      },
    },
  },
};
