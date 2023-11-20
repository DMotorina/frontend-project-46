#!/usr/bin/env node
import makeStylish from './formatters/stylish.js';
import makePlain from './formatters/plain.js';

const formats = {
  stylish: makeStylish,
  plain: makePlain,
  json: JSON.stringify,
};

export default (tree, formatName) => formats[formatName](tree);
