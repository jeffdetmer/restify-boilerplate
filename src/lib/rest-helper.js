import errors from 'restify-errors';
import { camelCase, mapKeys } from 'lodash';

function objectToCamelCase(data) {
  return mapKeys(data, (val, key) => camelCase(key));
}

function handleDataIfArray(data) {
  return data.map((obj) => objectToCamelCase(obj));
}

function handleDataIfString(data) {
  return data;
}

function handleData(data) {
  if (Array.isArray(data)) {
    return handleDataIfArray(data);
  } else if (typeof data === 'string') {
    return handleDataIfString(data);
  }
  return objectToCamelCase(data);
}

function prepareResponse(status, data, message = '') {
  const response = {
    status,
    message,
    data: handleData(data),
  };

  return response;
}

function send200(res, next, data = {}) {
  res.send(prepareResponse(200, data));
  return next();
}

function send201(res, next, data = {}) {
  res.send(201, prepareResponse(201, data));
  return next();
}

function send204(res, next) {
  res.send(204);
  return next();
}

function send400(res, next, err = new errors.BadRequestError()) {
  res.send(400, prepareResponse(400, {}, err.message || 'Invalid Request'));
  return next(err);
}

function send404(res, next) {
  res.send(404);
  return next(new errors.NotFoundError());
}

function send500(res, next, err = new errors.InternalServerError()) {
  res.send(
    500,
    prepareResponse(500, {}, err.message || 'Internal Server Error')
  );
  return next(new errors.InternalServerError(err.message));
}

export { send200, send201, send204, send400, send404, send500 };
