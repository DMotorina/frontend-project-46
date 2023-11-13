#!/usr/bin/env node
import { formatNestedNode } from './nodes/nested.js';
import { formatChangedNode } from './nodes/changed.js';
import { formatCommonNode } from './nodes/common.js';

const formatByNode = {
  nested: formatNestedNode,
  changed: formatChangedNode,
};

const getStylishTreeFormat = (tree, depth = 1) => {
  return (formatByNode[tree.type] ?? formatCommonNode)(tree, getStylishTreeFormat, depth);
};

export const stylish = (data) => {
  const result = data.map((tree) => getStylishTreeFormat(tree, 1));
  return `{\n${result.join('\n')}\n}`;
};
