import errors from 'restify-errors'
import {camelCase, mapKeys} from 'lodash'

function objectToCamelCase(data) {
  return mapKeys(data, (val, key) => camelCase(key))
}

function handleDataIfArray(data) {
  return data.map(obj => objectToCamelCase(obj))
}

function handleDataIfString(data) {
  return data
}

function handleData(data) {
  if (Array.isArray(data)) {
    return handleDataIfArray(data)
  } else if (typeof data === 'string') {
    return handleDataIfString(data)
  }
  return objectToCamelCase(data)
}

function prepareResponse(status, data, message = '') {
  const response = {
    status,
    message,
    data: handleData(data),
  }

  return response
}
function prepareErrorResponse(status, data, error) {
  const response = {
    status,
    error,
    data: handleData(data),
  }

  return response
}

function send200(res, next, data = {}) {
  res.send(prepareResponse(200, data))
  return next()
}

function send201(res, next, data = {}) {
  res.send(201, prepareResponse(201, data))
  return next()
}

function send204(res, next) {
  res.send(204)
  return next()
}

function send400(res, next, err = new errors.BadRequestError()) {
  res.send(400, prepareErrorResponse(400, {}, err))
  return next()
}

function send404(res, next) {
  res.send(404, prepareErrorResponse(404, {}, new errors.NotFoundError()))
  return next()
}

function send500(res, next, err = new errors.InternalServerError()) {
  res.send(500, prepareErrorResponse(500, {}, err))
  return next()
}

export {send200, send201, send204, send400, send404, send500}
