import fs from 'fs';
import path from 'path';
import YAML from 'yaml'


const createUniqueKeys = (data1, data2) => {
  const keys = [...Object.keys(data1), ...Object.keys(data2)];
  return new Set(keys.sort());
}

const getDiff = (parsedData1, parsedData2) => {
  const keys = createUniqueKeys(parsedData1, parsedData2)

  const diff = [...keys].map((key) => {
    if (parsedData1[key] === undefined) {
      return `  + ${key}: ${parsedData2[key]}`;
    }

    if (parsedData2[key] === undefined) {
      return `  - ${key}: ${parsedData1[key]}`;
    }

    return parsedData1[key] === parsedData2[key] 
      ? `    ${key}: ${parsedData1[key]}` 
      : `  - ${key}: ${parsedData1[key]}\n  + ${key}: ${parsedData2[key]}`;
  });

  return `{\n${diff.join('\n')}\n}`;
}

const getParserJSON = (data1, data2) => {
  const parsedData1 = JSON.parse(fs.readFileSync(path.resolve(data1)));
  const parsedData2 = JSON.parse(fs.readFileSync(path.resolve(data2)));

  return getDiff(parsedData1, parsedData2)
}

const getParserYML = (data1, data2) => {
  const parsedData1 = YAML.parse(fs.readFileSync(path.resolve(data1), 'utf8'))
  const parsedData2 = YAML.parse(fs.readFileSync(path.resolve(data2), 'utf8'))

  return getDiff(parsedData1, parsedData2)
}

const dispatcher = {
  '.json': (filepath1, filepath2) => getParserJSON(filepath1, filepath2),
  '.yml': (filepath1, filepath2) => getParserYML(filepath1, filepath2)
}

const parser = (filepath1, filepath2) => {
  const name1 = path.extname(filepath1)
  const name2 = path.extname(filepath2)

  return dispatcher[name1](filepath1, filepath2) && dispatcher[name2](filepath1, filepath2)
}

export default parser;
