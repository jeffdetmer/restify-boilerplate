import database from '../services';
import logger from '../lib/logger';
import { send200, send201, send500 } from '../lib/rest-helper';

async function get(req, res, next) {
  let data;
  try {
    data = await database.get();
    send200(res, data, next);
  } catch (err) {
    logger.error(err);
    send500(res, err, next);
  }
}

async function post(req, res, next) {
  let result;
  try {
    res.setHeader('Content-Type', req.contentType());
    const data = {
      ...req.body,
    };
    result = data;
    send201(res, result, next);
  } catch (err) {
    logger.error(err);
    send500(res, err, next);
  }
}

export default { get, post };
