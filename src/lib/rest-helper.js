import restify from 'restify';
import { camelCase, mapKeys } from 'lodash';

function handleDataIfArray(data) {
  let arr = data;
  if (arr.length === 1) {
    arr = data.pop();
    return mapKeys(arr, (val, key) => camelCase(key));
  }
  return arr.map((obj) => mapKeys(obj, (val, key) => camelCase(key)));
}

function handleDataIfObject(data) {
  return mapKeys(data, (val, key) => camelCase(key));
}

function handleData(data) {
  if (Array.isArray(data)) {
    return handleDataIfArray(data);
  }
  return handleDataIfObject(data);
}

function prepareResponse(data, status, message) {
  const response = {
    status,
    message,
    data: handleData(data),
  };

  return response;
}

function send200(res, data, next) {
  res.send(prepareResponse(data, 200));
  return next();
}

function send201(res, data, next) {
  res.send(201, prepareResponse(data, 201));
  return next();
}

function send204(res, next) {
  res.send(204);
  return next();
}

function send400(res, next) {
  res.send(400);
  return next(new restify.BadRequestError());
}

function send404(res, next) {
  res.send(404);
  return next(new restify.NotFoundError());
}

function send500(res, err, next) {
  res.send(500, prepareResponse(500, 'Internal Server Error'));
  return next(new restify.InternalServerError());
}


export default { send200, send201, send204, send400, send404, send500 };
