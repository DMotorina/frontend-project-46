#!/usr/bin/env node
import path from 'path';
import { cwd } from 'process';
import { readFileSync } from 'fs';

import { parser } from './parser.js';
import { format } from './format/format.js';
import { buildAST } from './ast/builder.js';

const getFormat = (filePath) => path.extname(path.resolve(cwd(), filePath)).slice(1);

export const generateDifference = (filePath1, filePath2, formatName = null) => {
  const tree = buildAST(
    parser(readFileSync(filePath1, 'utf-8'), getFormat(filePath1)),
    parser(readFileSync(filePath2, 'utf-8'), getFormat(filePath2)),
  );

  return format(tree, formatName ?? 'stylish');
};
