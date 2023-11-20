#!/usr/bin/env node
import _ from 'lodash';

const isAdded = (_data2, data1, key) => !(_.has(data1, key));
const getAddNode = (_buildAST, data2, _data1, key) => ({
  type: 'added',
  key,
  value: data2[key],
});

const isRemoved = (data2, _data1, key) => !(_.has(data2, key));
const getRemovedNode = (_buildAST, _data2, data1, key) => ({
  type: 'removed',
  key,
  value: data1[key],
});

const isNested = (data2, data1, key) => _.isPlainObject(data1[key]) && _.isPlainObject(data2[key]);
const getNestedNode = (buildAST, data2, data1, key) => ({
  type: 'nested',
  key,
  children: buildAST(data1[key], data2[key]),
});

const isChanged = (data2, data1, key) => !(_.isEqual(data1[key], data2[key]));
const getChangedNode = (_buildAST, data2, data1, key) => ({
  type: 'changed',
  key,
  value1: data1[key],
  value2: data2[key],
});

const isUnchanged = (data2, data1, key) => _.isEqual(data1[key], data2[key]);
const getUnchangedNode = (_buildAST, _data2, data1, key) => ({
  key,
  value: data1[key],
  type: 'unchanged',
});

const checkers = [
  [isAdded, getAddNode],
  [isRemoved, getRemovedNode],
  [isNested, getNestedNode],
  [isChanged, getChangedNode],
  [isUnchanged, getUnchangedNode],
];

const createUniqueKeys = (data1, data2) => _.uniq([...Object.keys(data1), ...Object.keys(data2)]);

const buildAST = (data1, data2) => createUniqueKeys(data1, data2).sort().map((key) => {
  for (let element = 0; element < checkers.length; element += 1) {
    const [check, getNode] = checkers[element];

    if (check(data2, data1, key)) {
      return getNode(buildAST, data2, data1, key);
    }
  }

  return null;
});
export default buildAST;
