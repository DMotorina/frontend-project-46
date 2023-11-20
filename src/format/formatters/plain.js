#!/usr/bin/env node
import _ from 'lodash';

const stringify = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }

  return _.isString(value) ? `'${value}'` : value;
};

const getPlainTreeFormat = (tree, parent = '') => {
  switch (tree.type) {
    case 'added':
      return `Property '${parent}${tree.key}' was added with value: ${stringify(tree.value)}`;
    case 'removed':
      return `Property '${parent}${tree.key}' was removed`;
    case 'unchanged':
      return null;
    case 'changed':
      return `Property '${parent}${tree.key}' was updated. From ${stringify(tree.value1)} to ${stringify(tree.value2)}`;
    case 'nested':
      return tree.children.map((val) => getPlainTreeFormat(val, `${parent + tree.key}.`))
        .filter((item) => item !== null).join('\n');
    default:
      throw new Error(`Unknown type: ${tree.type}`);
  }
};

export default (data) => {
  const result = data.map((tree) => getPlainTreeFormat(tree));
  const filteredResult = result.filter((element) => element !== null);
  return filteredResult.join('\n');
};
