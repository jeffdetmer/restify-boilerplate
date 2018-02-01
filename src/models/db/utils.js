import fp from 'lodash/fp'
import db from './'

function getColumns(tableName) {
  return db('ALL_TAB_COLS')
    .where({table_name: tableName}) // eslint-disable-line camelcase
    .select('column_name')
    .options({rowMode: 'array'})
    .then(fp.map(fp.first))
}

function addPrefixAliasToColumns(tableName, columns) {
  const fn = fp.map(
    column => `${tableName}.${column} as ${tableName}_${column}`,
  )

  if (columns) {
    return fn(columns)
  }

  return fn
}

function getColumnsByTableNamePrefix(tableName, columns) {
  const fn = fp.compose([
    fp.mapKeys(fp.replace(`${tableName}_`, '')),
    fp.pickBy((value, key) => fp.startsWith(`${tableName}_`, key)),
  ])

  if (columns) {
    return fn(columns)
  }

  return fn
}

function convertToSnakeCase(value) {
  return fp
    .snakeCase(value)
    .toUpperCase()
    .trim()
}

export default {
  getColumns,
  addPrefixAliasToColumns,
  getColumnsByTableNamePrefix,
  convertToSnakeCase,
}
