import restify from 'restify';
import logger from './lib/logger';
import { version, ping, echo } from './controllers';
import pkg from '../package.json';

/**
 * Returns a server with all routes defined on it
 */

const server = restify.createServer({
  name: pkg.name,
  version: '1.0.0',
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

const headers = 'X-Requested-With, Cookie, Set-Cookie, Accept, Access-Control-Allow-Credentials, Origin, Content-Type, Request-Id , X-Api-Version, X-Request-Id, X-TimezoneOffset, Authorization';
server.opts('.*', (req, res, next) => {
  let requestMethod;
  if (req.headers.origin && req.headers['access-control-request-method']) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', headers);
    res.header('Access-Control-Expose-Headers', 'Set-Cookie');
    requestMethod = req.headers['access-control-request-method'];
    res.header('Allow', requestMethod);
    res.header('Access-Control-Allow-Methods', requestMethod);
    if (req.log) {
      req.log.info(
        {
          url: req.url,
          method: req.headers['access-control-request-method'],
        },
        'Preflight'
      );
    }
    res.send(204);
    return next();
  }
  res.send(404);
  return next();
});
server.use((req, res, next) => {
  if (req.headers.origin) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
  }
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', headers);
  res.header('Access-Control-Expose-Headers', 'Set-Cookie');
  return next();
});

// Use the common stuff you probably want
server.use(restify.acceptParser(server.acceptable));
server.use(restify.dateParser());
server.use(restify.authorizationParser());
server.use(restify.queryParser());
server.use(restify.gzipResponse());
server.use(restify.bodyParser());

// Some standard handlers
server.get('/version', version.get);
server.get('/ping', ping.get);
server.get('/echo/:name', echo.get);
server.post('/echo', echo.post);

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
