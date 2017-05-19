import restify from 'restify';
import { database } from '../services';
import logger from '../lib/logger';
import { send200, send201, send400, send500 } from '../lib/rest-helper';

async function get(req, res, next) {
  let data;
  try {
    if (!('name' in req.params)) {
      throw new restify.InternalServerError();
    }
    data = database.get(req.params.name);
    send200(res, next, data);
  } catch (err) {
    logger.error(err);
    send500(res, next, err);
  }
}

async function post(req, res, next) {
  let result;
  try {
    res.setHeader('Content-Type', req.contentType());
    const data = {
      ...req.body,
    };
    if (!('name' in data)) {
      throw new restify.InvalidArgumentError('Invalid Person');
    }
    result = data;
    send201(res, next, result);
  } catch (err) {
    logger.error(err);
    send400(res, next, err);
  }
}

export default { get, post };
