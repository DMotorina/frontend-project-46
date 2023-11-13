import _ from 'lodash';

export const isAdded = (data2, data1, key) => !_.has(data1, key);

export const getAddNode = (buildAST, data2, data1, key) => ({
  type: 'added',
  key,
  value: data2[key],
});
