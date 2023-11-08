#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import YAML from 'yaml';

const getParserJSON = (data) => JSON.parse(fs.readFileSync(path.resolve(data)));

const getParserYML = (data) => YAML.parse(fs.readFileSync(path.resolve(data), 'utf8'))

const dispatcher = {
  '.json': (filepath) => getParserJSON(filepath),
  '.yml': (filepath) => getParserYML(filepath)
}

const parser = (filepath1, filepath2) => {
  const name1 = path.extname(filepath1)
  const name2 = path.extname(filepath2)
  
  const obj1 = dispatcher[name1](filepath1)
  const obj2 = dispatcher[name2](filepath2)

  return [obj1, obj2]
}

export default parser;
