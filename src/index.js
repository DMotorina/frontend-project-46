#!/usr/bin/env node
import path from 'path'
import { cwd } from 'process'
import { readFileSync } from 'fs'

import parser from './parser.js'
import getDiffTree from './buildAST.js'
import format from './formatters/index.js'

const getPath = (filepath) => path.resolve(cwd(), filepath)
const getFileFormat = (filepath) => path.extname(filepath).slice(1)

export default (filepath1, filepath2, formatName = 'stylish') => {
  const path1 = getPath(filepath1);
  const path2 = getPath(filepath2);

  const obj1 = readFileSync(filepath1, 'utf-8');
  const obj2 = readFileSync(filepath2, 'utf-8');
  
  const parseObj1 = parser(obj1, getFileFormat(path1))
  const parseObj2 = parser(obj2, getFileFormat(path2))
  
  const tree = getDiffTree(parseObj1, parseObj2)

  return format(tree, formatName)
}