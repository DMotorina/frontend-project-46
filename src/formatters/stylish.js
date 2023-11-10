#!/usr/bin/env node
import _ from 'lodash';

const symbols = {
  added: '+',
  removed: '-',
  unchanged: ' ',
  nested: ' ',
};

const str = ' ';
const indentations = 4;
const leftShifts = 2;

const makeIndent = (depth) => str.repeat((depth * indentations) - leftShifts);

const stringify = (value, depth = 1) => {
  if (!_.isObject(value)) {
    return value;
  }

  const keys = Object.keys(value).map(
    (key) => `${makeIndent(depth + 1)}  ${key}: ${stringify(value[key], depth + 1)}`,
  );
  return `{\n${keys.join('\n')}\n  ${makeIndent(depth)}}`;
};

const getValueForChangedType = (value1, value2, key, depth) => `${makeIndent(depth)}${symbols.removed} ${key}: ${value1}\n${makeIndent(depth)}${
  symbols.added
} ${key}: ${value2}`;

const getValueForNestedType = (data, key, depth) => `${makeIndent(depth)}  ${key}: {\n${data.join('\n')}\n ${makeIndent(depth)} }`;

const getStylishTreeFormat = (tree, depth = 1) => {
  const { key } = tree;

  switch (tree.type) {
    case 'nested': {
      const childrens = tree.children;
      const data = childrens.map((child) => getStylishTreeFormat(child, depth + 1));
      return getValueForNestedType(data, key, depth);
    }

    case 'changed': {
      const value1 = stringify(tree.valueBefore, depth);
      const value2 = stringify(tree.valueAfter, depth);
      return getValueForChangedType(value1, value2, key, depth);
    }

    case 'added':
    case 'removed':
    case 'unchanged':
      return `${makeIndent(depth)}${symbols[tree.type]} ${key}: ${stringify(tree.value, depth)}`;

    default:
      throw new Error(`Unknown type: ${tree.type}`);
  }
};
export default (data) => {
  const result = data.map((tree) => getStylishTreeFormat(tree, 1));
  return `{\n${result.join('\n')}\n}`;
};
