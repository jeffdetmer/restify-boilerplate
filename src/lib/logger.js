import bunyan from 'bunyan';
import Config from '../lib/config';
import pkg from '../../package.json';

const streams = [];
streams.push({
  level: (Config.get('/logLevel')),
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
  env: Config.get('/env'),
  streams,
});

export default logger;
