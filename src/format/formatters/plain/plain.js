#!/usr/bin/env node
import { stringify } from './utils.js';

const formatAddedNode = ({ value }, _format, path) => {
  const data = stringify(value);
  return `Property '${path}' was added with value: ${data}`;
};

const formatRemovedNode = (_tree, _format, path) => `Property '${path}' was removed`;

const formatChangedNode = ({ value1, value2 }, _format, path) => {
  return `Property '${path}' was updated. From ${stringify(value1)} to ${stringify(value2)}`;
};

const formatNestedNode = ({ children }, format, path) => {
  const data = children.map((child) => format(child, `${path}.`));
  return data.filter((item) => item !== null).join('\n');
};

const formatByNode = {
  added: formatAddedNode,
  removed: formatRemovedNode,
  changed: formatChangedNode,
  nested: formatNestedNode,
  unchanged: () => null,
};

const getPlainTreeFormat = (tree, parent = '') => {
  const path = `${parent}${tree.key}`;
  return formatByNode[tree.type](tree, getPlainTreeFormat, path);
};

export const plain = (data) => {
  const result = data.map((tree) => getPlainTreeFormat(tree));
  const filteredResult = result.filter((element) => element !== null);
  return filteredResult.join('\n');
};
