import restify from 'restify';
import logger from './lib/logger';
import { version, ping, echo, api } from './controllers';
import pkg from '../package.json';

/**
 * Returns a server with all routes defined on it
 */

const server = restify.createServer({
  name: pkg.name,
  version: '1.0.0',
  log: logger.child({
    component: 'server',
  }),
});

// Ensure we don't drop data on uploads
server.pre(restify.pre.pause());

// Clean up sloppy paths like //user//////1//
server.pre(restify.pre.sanitizePath());

// Handles annoying user agents (curl)
server.pre(restify.pre.userAgentConnection());

// Set a per request bunyan logger (with requestid filled in)
server.use(restify.requestLogger());

if (process.env.NODE_ENV === 'prod') {
  // Allow 10 requests/second by IP, and burst to 25
  server.use(
    restify.throttle({
      burst: 25,
      rate: 10,
      ip: true,
    })
  );
}

// Use the common stuff you probably want
server.use(restify.acceptParser(server.acceptable));
server.use(restify.authorizationParser());
server.use(restify.CORS());
server.use(restify.dateParser());
server.use(restify.queryParser());
server.use(restify.gzipResponse());
server.use(restify.bodyParser());
server.use(restify.requestLogger());
server.use(restify.fullResponse());

// Some standard handlers
server.get('/version', version.get);
server.get('/ping', ping.get);
server.get('/echo/:name', echo.get);
server.post('/echo', echo.post);
server.get('/api', api.get);
server.post('/api/:batch', api.post);

server.on(
  'after',
  restify.auditLogger({
    log: logger.child({
      component: 'audit',
    }),
  })
);

server.on('uncaughtException', (req, res, route, e) => {
  logger.error(e);
  res.send(new restify.InternalError(e, e.message || 'unexpected error'));
  return true;
});

export default server;
