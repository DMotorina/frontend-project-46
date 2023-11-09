import fs from 'fs'
import path from 'path'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

import genDiff from '../src/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename)
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8')

const resultStylish = readFile('expected_stylish_file.txt')
const resultPlain = readFile('expected_plain_file.txt')

test('testing JSON in default format', () => {
    const actual = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))
    expect(actual).toEqual(resultStylish)
})

test('testing YML in default format', () => {
    const actual = genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'))
    expect(actual).toEqual(resultStylish)
})

test('testing JSON in stylish format', () => {
    const actual = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'stylish')
    expect(actual).toEqual(resultStylish)
})

test('testing YML in stylish format', () => {
    const actual = genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'stylish')
    expect(actual).toEqual(resultStylish)
})

test('testing JSON in plain format', () => {
    const actual = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain')
    expect(actual).toBe(resultPlain)
})

test('testing YML in plain format', () => {
    const actual = genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'plain')
    expect(actual).toBe(resultPlain)
})