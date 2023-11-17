#!/usr/bin/env node
import { stringify, makeIndent, symbols } from './utils.js';

const formatNestedNode = ({ key, children }, format, depth) => {
  const data = children.map((child) => format(child, depth + 1));
  return `${makeIndent(depth)}  ${key}: {\n${data.join('\n')}\n ${makeIndent(depth)} }`;
};

const formatChangedNode = ({ key, value1, value2 }, _format, depth) => {
  const val1 = stringify(value1, depth);
  const val2 = stringify(value2, depth);
  const removedValue = `${makeIndent(depth)}${symbols.removed} ${key}: ${val1}`;
  const addedValue = `${makeIndent(depth)}${symbols.added} ${key}: ${val2}`;

  return `${removedValue}\n${addedValue}`;
};

const formatCommonNode = ({ key, type, value }, _format, depth) => {
  return `${makeIndent(depth)}${symbols[type]} ${key}: ${stringify(value, depth)}`;
};

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
