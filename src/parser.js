#!/usr/bin/env node
// eslint-disable-next-line import/no-extraneous-dependencies
import ymal from 'js-yaml';

export default (data, format) => (format === 'json' ? JSON.parse(data) : ymal.load(data));
