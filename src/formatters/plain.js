#!/usr/bin/env node
import _ from 'lodash';

const getSentencesForAddedValue = (path, value) => `Property '${path}' was added with value: ${value}`;

const getSentencesForRemovedValue = (path) => `Property '${path}' was removed`;

const getSentencesForChangedValue = (path, valueBefore, valueAfter) => `Property '${path}' was updated. From ${valueBefore} to ${valueAfter}`;

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }

  return _.isString(value) ? `'${value}'` : value;
};

const getPlaiTreeFormat = (tree, parent = '') => {
  const path = `${parent}${tree.key}`;

  switch (tree.type) {
    case 'added':
      return getSentencesForAddedValue(path, stringify(tree.value));

    case 'removed':
      return getSentencesForRemovedValue(path);

    case 'unchanged':
      return null;

    case 'changed': {
      const value1 = stringify(tree.valueBefore);
      const value2 = stringify(tree.valueAfter);
      return getSentencesForChangedValue(path, value1, value2);
    }

    case 'nested': {
      const childrens = tree.children;
      const data = childrens.map((child) => getPlaiTreeFormat(child, `${path}.`));
      return data.filter((item) => item !== null).join('\n');
    }

    default:
      throw new Error(`Unknown type: ${tree.type}`);
  }
};

export default (data) => {
  const result = data.map((tree) => getPlaiTreeFormat(tree));
  const filteredResult = result.filter((element) => element !== null);
  return filteredResult.join('\n');
};
