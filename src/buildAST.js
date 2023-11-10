#!/usr/bin/env node
import _ from 'lodash'

const createUniqueKeys = (data1, data2) => {
  const keys = [...Object.keys(data1), ...Object.keys(data2)]
  return _.uniq(keys)
}

const buildAST = (data1, data2) => {
  const allKeys = createUniqueKeys(data1, data2)
  const sortedAllkeys = allKeys.sort()
    
  const result = sortedAllkeys.map((key) => {
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return {
        type: 'nested',
        key,
        children: buildAST(data1[key], data2[key])
      }
    }
    
    if (!_.has(data1, key)) {
      return {
        type: 'added',
        key,
        value: data2[key]
      }
    }

    if (!_.has(data2, key)) {
      return {
        type: 'removed',
        key,
        value: data1[key]
      }
    }

    if (data1[key] !== data2[key]) {
      return {
        type: 'changed',
        key,
        valueBefore: data1[key],
        valueAfter: data2[key]
      }
    }

    return {
      key,
      value: data1[key],
      type: 'unchanged'
    }
  })

  return result
}

export default (data1, data2) => buildAST(data1, data2)