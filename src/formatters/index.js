#!/usr/bin/env node
import stylish from './stylish.js';
import plain from './plain.js';

const formats = {
  stylish,
  plain,
  json: JSON.stringify,
};

export default (tree, format) => formats[format](tree);
