#!/usr/bin/env node
import { formatAddedNode } from './nodes/added.js';
import { formatRemovedNode } from './nodes/removed.js';
import { formatChangedNode } from './nodes/changed.js';
import { formatNestedNode } from './nodes/nested.js';

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
