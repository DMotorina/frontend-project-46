#!/usr/bin/env node
import stylish from './stylish.js'
import plain from './plain.js'

export default (tree, format) => format === 'stylish' ? stylish(tree) : plain(tree)