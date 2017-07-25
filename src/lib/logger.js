import bunyan from 'bunyan';
import Config from './config';
import pkg from '../../package.json';

const streams = [];
streams.push({
  level: Config.logLevel,
  stream: process.stdout,
});

const logger = bunyan.createLogger({
  name: pkg.name,
  src: true,
  serializers: {
    req: bunyan.stdSerializers.req,
    res: bunyan.stdSerializers.res,
    err: bunyan.stdSerializers.err,
  },
  env: Config.env,
  streams,
});

export default logger;
