import Pkg from './package'

module.exports = wallaby => ({
  files: ['src/**/*.js', '!src/**/*.test.js'],
  tests: ['src/**/*.test.js'],
  env: {
    type: 'node',
    runner: 'node',
  },
  testFramework: 'jest',
  bootstrap: () => {
    wallaby.testFramework.configure(Pkg.jest)
  },
  compilers: {
    '**/*.js': wallaby.compilers.babel({
      presets: ['latest', 'stage-0'],
    }),
  },
})
