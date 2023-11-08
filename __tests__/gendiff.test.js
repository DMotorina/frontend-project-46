import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs'
import path from 'path'
import genDiff from '../src/genDiff';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('testing JSON format', () => {
    const expectedResult = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))
    const recievedResult = readFile('expected_file.txt')
    expect(expectedResult).toBe(recievedResult)
})

test('testing YAML format', () => {
    const expectedResult = genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'))
    const recievedResult = readFile('expected_file.txt')
    expect(expectedResult).toBe(recievedResult)
})