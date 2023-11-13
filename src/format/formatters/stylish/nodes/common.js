#!/usr/bin/env node
import { stringify, makeIndent, symbols } from '../utils.js';

export const formatCommonNode = ({ key, type, value }, _format, depth) => {
  return `${makeIndent(depth)}${symbols[type]} ${key}: ${stringify(value, depth)}`;
};
