export const isChanged = (data2, data1, key) => data1[key] !== data2[key];

export const getChangedNode = (buildAST, data2, data1, key) => ({
  type: 'changed',
  key,
  valueBefore: data1[key],
  valueAfter: data2[key],
});
