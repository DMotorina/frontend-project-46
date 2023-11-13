#!/usr/bin/env node
import { stylish } from './formatters/stylish/stylish.js';
import { plain } from './formatters/plain/plain.js';

const formats = { stylish, plain, json: JSON.stringify };
export const format = (tree, formatName) => formats[formatName](tree);
