#!/usr/bin/env node
import { stringify, makeIndent, symbols } from '../utils.js';

export const formatChangedNode = ({ key, valueBefore, valueAfter }, _format, depth) => {
  const value1 = stringify(valueBefore, depth);
  const value2 = stringify(valueAfter, depth);
  const removedValue = `${makeIndent(depth)}${symbols.removed} ${key}: ${value1}`;
  const addedValue = `${makeIndent(depth)}${symbols.added} ${key}: ${value2}`;

  return `${removedValue}\n${addedValue}`;
};
