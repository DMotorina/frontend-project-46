#!/usr/bin/env node

import parser from './parser.js';
import getDiffTree from './buildAST.js';
import _ from 'lodash';
import getStylishTreeDiff from './stylish.js';

const genDiff = (filepath1, filepath2) => {
  const [obj1, obj2] = parser(filepath1, filepath2);
  const result = getDiffTree(obj1, obj2)
  return getStylishTreeDiff(result)
};

export default genDiff;
