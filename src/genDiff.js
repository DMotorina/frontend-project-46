import fs from 'fs';
import path from 'path';
import parser from './parser.js';

export default (filepath1, filepath2) => {
  const data1 = JSON.parse(fs.readFileSync(path.resolve(filepath1)));
  const data2 = JSON.parse(fs.readFileSync(path.resolve(filepath2)));

  return parser(data1, data2);
};
