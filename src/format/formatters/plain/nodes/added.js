#!/usr/bin/env node
import { stringify } from '../utils.js';

export const formatAddedNode = ({ value }, _format, path) => {
  const data = stringify(value);
  return `Property '${path}' was added with value: ${data}`;
};
