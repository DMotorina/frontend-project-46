#!/usr/bin/env node
import ymal from 'js-yaml';

const parsers = { json: JSON.parse, yml: ymal.load };
export default (data, format) => parsers[format](data);
