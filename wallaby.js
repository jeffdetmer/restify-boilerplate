import Pkg from './package.json';

module.exports = (wallaby) => ({
  files: [
    { pattern: 'node_modules/babel-polyfill/dist/polyfill.js', instrument: false },
    'src/**/*.js',
    '!src/**/*.test.js',
  ],
  tests: [
    'src/**/*.test.js',
  ],
  env: {
    type: 'node',
    runner: 'node',
  },
  testFramework: 'jest',
  bootstrap: () => {
    wallaby.testFramework.configure(Pkg.jest);
  },
  compilers: {
    '**/*.js': wallaby.compilers.babel({
      presets: ['latest', 'stage-0'],
    }),
  },
});
