import direx from 'glob-require-dir';

const esModules = direx({
  esModules: true,
});

module.exports = esModules;
