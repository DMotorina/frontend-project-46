#!/usr/bin/env node
import ymal from 'js-yaml';

const parsers = { json: JSON.parse, yml: ymal.load };
export const parse = (data, format) => parsers[format](data);
