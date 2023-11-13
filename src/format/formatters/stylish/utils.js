#!/usr/bin/env node
import _ from 'lodash';

export const symbols = {
  added: '+',
  removed: '-',
  unchanged: ' ',
  nested: ' ',
};

const str = ' ';
const indentations = 4;
const leftShifts = 2;

export const makeIndent = (depth) => str.repeat((depth * indentations) - leftShifts);

export const stringify = (value, depth = 1) => {
  if (!_.isObject(value)) {
    return value;
  }

  const keys = Object.keys(value).map(
    (key) => `${makeIndent(depth + 1)}  ${key}: ${stringify(value[key], depth + 1)}`,
  );
  return `{\n${keys.join('\n')}\n  ${makeIndent(depth)}}`;
};
