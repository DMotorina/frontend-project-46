#!/usr/bin/env node
import { makeIndent } from '../utils.js';

export const formatNestedNode = ({ key, children }, format, depth) => {
  const data = children.map((child) => format(child, depth + 1));
  return `${makeIndent(depth)}  ${key}: {\n${data.join('\n')}\n ${makeIndent(depth)} }`;
};
