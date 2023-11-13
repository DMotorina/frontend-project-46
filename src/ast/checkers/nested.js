import _ from 'lodash';

export const isNested = (data2, data1, key) => _.isObject(data1[key]) && _.isObject(data2[key]);

export const getNestedNode = (buildAST, data2, data1, key) => ({
  type: 'nested',
  key,
  children: buildAST(data1[key], data2[key]),
});
