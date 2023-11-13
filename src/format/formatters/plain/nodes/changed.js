#!/usr/bin/env node
import { stringify } from '../utils.js';

export const formatChangedNode = ({ valueBefore, valueAfter }, _format, path) => {
  return `Property '${path}' was updated. From ${stringify(valueBefore)} to ${stringify(valueAfter)}`;
};
