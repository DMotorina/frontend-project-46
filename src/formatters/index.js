#!/usr/bin/env node
import stylish from './stylish.js'
import plain from './plain.js'

const formats = {
    'stylish': stylish,
    'plain': plain,
    'json': JSON.stringify
}

export default (tree, format) => {
    return formats[format](tree)
}