#!/usr/bin/env node
import path from 'path';
import fs from 'fs';

import parse from './parser.js';
import format from './format/format.js';
import buildAST from './builder.js';

const getAbsolutPath = (filepath) => path.resolve(process.cwd(), filepath);
const readFile = (filepath) => fs.readFileSync(getAbsolutPath(filepath), 'utf-8');
const getFormat = (filename) => filename.split('.')[1];
const getData = (filepath) => parse(readFile(filepath), getFormat(filepath));

export default (filePath1, filePath2, formatName = 'stylish') => {
  const data1 = getData(filePath1);
  const data2 = getData(filePath2);

  const tree = buildAST(data1, data2);

  return format(tree, formatName);
};
