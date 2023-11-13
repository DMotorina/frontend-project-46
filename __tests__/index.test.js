#!/usr/bin/env node
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import { generateDifference } from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const resultStylish = readFile('expected_stylish_file.txt');
const resultPlain = readFile('expected_plain_file.txt');
const resultJSON = readFile('expected_json_file.txt');

test.each([
  ['file1.json', 'file2.json', null, resultStylish],
  ['file1.yml', 'file2.yml', null, resultStylish],
  ['file1.json', 'file2.json', 'stylish', resultStylish],
  ['file1.yml', 'file2.yml', 'stylish', resultStylish],
  ['file1.json', 'file2.json', 'plain', resultPlain],
  ['file1.yml', 'file2.yml', 'plain', resultPlain],
  ['file1.json', 'file2.json', 'json', resultJSON],
  ['file1.yml', 'file2.yml', 'json', resultJSON],
])(
  'Testing %s and %s in %s format',
  (filePath1, filePath2, format, expected) => {
    const result = generateDifference(getFixturePath(filePath1), getFixturePath(filePath2), format);
    expect(result).toEqual(expected);
  },
);
