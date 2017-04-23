#!/usr/bin/env node
// this file needs to be able to _parse_ in node v0.12.0
if (Number(process.versions.node.slice(0, 1)) < 6) {
  throw new Error('You must have node version 6 installed.');
}

const shell = require('shelljs'); // eslint-disable-line import/no-extraneous-dependencies
const verifySystem = require('workshop-setup').verifySystem; // eslint-disable-line import/no-extraneous-dependencies
const installDeps = require('workshop-setup').installDeps; // eslint-disable-line import/no-extraneous-dependencies
const logger = require('console');
const path = require('path');
const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf8');

const installOracle = async () => {
  try {
    if (!fs.existsSync('/opt/oracle/instantclient')) {
      shell.exec('curl -O http://jeffdetmer.com/instantclient_12_2.tar.gz', {
        silent: true,
      });
      shell.exec(
        `tar -xvzf ${path.resolve(__dirname, '../oracle')}/instantclient_12_2.tar.gz -C /opt/oracle`,
        {
          silent: true,
        }
      );
      shell.mv('/opt/oracle/instantclient_12_2', '/opt/oracle/instantclient');
      shell.cd('/opt/oracle/instantclient');
      shell.ln('-sf', 'libclntsh.so.12.1', 'libclntsh.so');
      logger.log('🎉  Oracle InstantClient has been installed!');
    } else {
      logger.log('🎉  Oracle InstantClient has already been installed!');
    }
  } catch (error) {
    logger.error(error);
    shell.exit(1);
  }
};
const setup = async () => {
  try {
    await installOracle();
    await verifySystem([
      verifySystem.validators.node('^6.10.2 || ^7.5.0'),
      verifySystem.validators.yarnNpm('^0.23.2', '^4.5.0'),
    ]);
    logger.log('🎉  Congrats! Your system is setup properly');
    await installDeps(path.resolve(__dirname, '../..'));
    logger.log('👍  all dependencies installed');
  } catch (error) {
    logger.error('💥  ', error);
    shell.exit(1);
  }
  shell.exit(0);
};
setup();
