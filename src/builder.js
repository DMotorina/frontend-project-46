#!/usr/bin/env node
import _ from 'lodash';

const createUniqueKeys = (data1, data2) => _.uniq([...Object.keys(data1), ...Object.keys(data2)]);

const buildAST = (data1, data2) => {
  const sortedKeys = createUniqueKeys(data1, data2).sort();

  const result = sortedKeys.map((key) => {
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return {
        type: 'nested',
        key,
        children: buildAST(data1[key], data2[key]),
      };
    }

    if (!_.has(data1, key)) {
      return {
        type: 'added',
        key,
        value: data2[key],
      };
    }

    if (!_.has(data2, key)) {
      return {
        type: 'removed',
        key,
        value: data1[key],
      };
    }

    if (!(_.isEqual(data1[key], data2[key]))) {
      return {
        type: 'changed',
        key,
        value1: data1[key],
        value2: data2[key],
      };
    }

    return {
      key,
      value: data1[key],
      type: 'unchanged',
    };
  });

  return result;
};
export default buildAST;
