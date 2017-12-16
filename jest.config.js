const jestConfig = require('jmd-scripts/config').jest

jestConfig.collectCoverageFrom = jestConfig.collectCoverageFrom.concat([
  '!src/serve.js',
  '!src/server.js',
  '!src/index.js',
])

jestConfig.setupFiles = ['<rootDir>/setupTests.js']

module.exports = jestConfig
