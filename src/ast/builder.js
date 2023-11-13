import _ from 'lodash';

import { isNested, getNestedNode } from './checkers/nested.js';
import { isAdded, getAddNode } from './checkers/added.js';
import { isRemoved, getRemovedNode } from './checkers/removed.js';
import { isChanged, getChangedNode } from './checkers/changed.js';

const checkers = [
  [isNested, getNestedNode],
  [isAdded, getAddNode],
  [isRemoved, getRemovedNode],
  [isChanged, getChangedNode],
];

const createUniqueKeys = (data1, data2) => _.uniq([...Object.keys(data1), ...Object.keys(data2)]);

export const buildAST = (data1, data2) => createUniqueKeys(data1, data2).sort().map((key) => {
  for (const [check, getNode] of checkers) {
    if (check(data2, data1, key)) {
      return getNode(buildAST, data2, data1, key);
    }
  }

  return {
    key,
    value: data1[key],
    type: 'unchanged',
  };
});
