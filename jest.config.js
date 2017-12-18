const jestConfig = require('jmd-scripts/config').jest

jestConfig.collectCoverageFrom = jestConfig.collectCoverageFrom.concat([
  '!src/serve.js',
  '!src/server.js',
  '!src/index.js',
])

jestConfig.setupFiles = ['<rootDir>/setupTests.js']

jestConfig.coverageThreshold = {
  global: {
    branches: 10,
    functions: 10,
    lines: 10,
    statements: 10,
  },
}

module.exports = jestConfig
