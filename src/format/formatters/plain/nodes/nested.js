#!/usr/bin/env node
export const formatNestedNode = ({ children }, format, path) => {
  const data = children.map((child) => format(child, `${path}.`));
  return data.filter((item) => item !== null).join('\n');
};
