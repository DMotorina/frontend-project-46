#!/usr/bin/env node
import _ from "lodash"

const getSentencesForAddedValue = (path, value) => {
    return `Property '${path}' was added with value: ${value}`
}

const getSentencesForRemovedValue = (path) => {
    return `Property '${path}' was removed`
}

const getSentencesForChangedValue = (path, valueBefore, valueAfter) => {
    return `Property '${path}' was updated. From ${valueBefore} to ${valueAfter}`
}

const stringify = (value) => {
    if (_.isObject(value)) {
        return '[complex value]'
    }

    if(_.isString(value)) {
        return `'${value}'`
    }

    return value
}

const getPlaiTreeFormat = (tree, parent = '') => {
    const path = `${parent}${tree.key}`

    switch(tree.type) {
        case 'added': 
            const value = `${stringify(tree.value)}`
            return getSentencesForAddedValue(path, value)

        case 'removed': 
            return getSentencesForRemovedValue(path)

        case 'unchanged': 
            return null

        case 'changed': 
            const value1 = `${stringify(tree.valueBefore)}`
            const value2 = `${stringify(tree.valueAfter)}`

            return getSentencesForChangedValue(path, value1, value2)

        case 'nested': 
            const childrens = tree.children.map((child) => getPlaiTreeFormat(child, `${path}.`))
            return childrens.filter((item) => item !== null).join('\n')

        default: 
            throw new Error(`Unknown type: ${tree.type}`)
    }
}

export default (data) => {
    const result = data.map((tree) => getPlaiTreeFormat(tree))
    const filteredResult = result.filter((element) => element !== null)
    return filteredResult.join('\n')
}