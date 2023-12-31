#!/usr/bin/env node
import { Command } from 'commander';
import generateDifference from '../index.js';

const program = new Command();

program
  .version('0.0.1', '-V, --version', 'output the version number')
  .option('-f, --format <type>', 'output format', 'stylish')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    console.log(generateDifference(filepath1, filepath2, program.opts().format));
  });

program.parse();
