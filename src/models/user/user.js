/* eslint-disable camelcase */

import fp from 'lodash/fp'
import joi from 'joi'
import db from '../db'

const tableName = 'user'

const insertSchema = joi
  .object({
    id: joi
      .number()
      .integer()
      .required(),
    login: joi.string().required(),
    avatar_url: joi
      .string()
      .uri()
      .required(),
    html_url: joi
      .string()
      .uri()
      .required(),
    type: joi.string().required(),
  })
  .required()

const insert = async params => {
  const user = joi.attempt(params, insertSchema)

  await db(tableName)
    .insert(user)
    .returning('*')
    .then(fp.first)
}

const readSchema = joi
  .object({
    id: joi.number().integer(),
    login: joi.string(),
  })
  .xor('id', 'login')
  .required()

const read = async params => {
  const selection = joi.attempt(params, readSchema)

  await db(tableName)
    .where(selection)
    .select()
    .first()
}

export default {tableName, insert, read}
