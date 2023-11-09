#!/usr/bin/env node
import ymal from 'js-yaml';

export default (data, format) => format === 'json' ? JSON.parse(data) : ymal.load(data)