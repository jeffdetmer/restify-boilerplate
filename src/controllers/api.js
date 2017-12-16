import errors from 'restify-errors'
import joi from 'joi'
import User from '../models/user'
import logger from '../lib/logger'
import {send200, send201, send400, send500} from '../lib/rest-helper'

async function get(req, res, next) {
  let data
  const inputSchema = joi
    .object({
      locnNbr: joi
        .number()
        .integer()
        .required(),
      itemBrcd: joi.string().required(),
    })
    .unknown()
    .required()

  try {
    const input = {
      locnNbr: req.query.locnNbr,
      itemBrcd: req.query.itemBrcd,
    }
    joi.attempt(input, inputSchema)
    data = await User.read(input)
    send200(res, next, data)
  } catch (err) {
    logger.error(err)
    send500(res, next, new errors.InternalServerError())
  }
}

async function post(req, res, next) {
  let result
  const inputSchema = joi
    .object({
      locnNbr: joi
        .number()
        .integer()
        .required(),
      itemBrcd: joi.string().required(),
    })
    .unknown()
    .required()

  try {
    res.setHeader('Content-Type', req.contentType())
    const data = req.body
    joi.attempt(data, inputSchema)
    result = await User.insert(data)
    send201(res, next, result)
  } catch (err) {
    logger.error(err)
    send400(res, next, new errors.InvalidContentError())
  }
}

function error(req, res, next) {
  try {
    throw new errors.RestError('This is expected')
  } catch (err) {
    logger.error(err)
    send400(res, next, err)
  }
}

export default {get, post, error}
