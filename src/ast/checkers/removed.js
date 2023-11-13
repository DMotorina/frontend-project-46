import _ from 'lodash';

export const isRemoved = (data2, data1, key) => !_.has(data2, key);

export const getRemovedNode = (buildAST, data2, data1, key) => ({
  type: 'removed',
  key,
  value: data1[key],
});
