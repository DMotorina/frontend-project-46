#!/usr/bin/env node

import _ from 'lodash';

const symbols = {
    added: '+',
    removed: '-',
    unchanged: ' ',
    nested: ' ',
}

const makeIndent = (depth) => {
    return ' '.repeat(depth * 4 - 2)
}
  
const stringify = (value, depth = 1) => {
    if (!_.isObject(value)) {
      return value
    }

    const keys = Object.keys(value)

    const getKeys = keys.map(
      (key) => `${makeIndent(depth + 1)}  ${key}: ${stringify(
        value[key],
        depth + 1,
      )}`,
    );
    return `{\n${getKeys.join('\n')}\n  ${makeIndent(depth)}}`
};

const getStylishTreeDiff = (tree, depth = 1) => {
    switch(tree.type) {
        case 'nested':
            const childrens = tree.children.map((child) => getStylishTreeDiff(child, depth + 1))
            return `${makeIndent(depth)}  ${tree.key}: {\n${childrens.join('\n')}\n ${makeIndent(depth)} }`

        case 'added':
        case 'removed':
        case 'unchanged':
            return `${makeIndent(depth)}${symbols[tree.type]} ${
                tree.key
            }: ${stringify(tree.value, depth)}`;

        case 'changed':
            const value1 = stringify(tree.valueBefore, depth)
            const value2 = stringify(tree.valueAfter, depth)

            return `${makeIndent(depth)}${symbols.removed} ${
                tree.key
            }: ${value1}\n${makeIndent(depth)}${
                symbols.added
            } ${tree.key}: ${value2}`
    }
}

export default (diff) => `{\n${diff.map((value) => getStylishTreeDiff(value, 1)).join('\n')}\n}`