### Hexlet tests and linter status:
<a href="https://codeclimate.com/github/DMotorina/frontend-project-46/maintainability"><img src="https://api.codeclimate.com/v1/badges/2dbcd531d977d807f12b/maintainability" /></a>

<a href="https://codeclimate.com/github/DMotorina/frontend-project-46/test_coverage"><img src="https://api.codeclimate.com/v1/badges/2dbcd531d977d807f12b/test_coverage" /></a>

[![Actions Status](https://github.com/DMotorina/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/DMotorina/frontend-project-46/actions)

## Description
Compares two configuration files and shows a difference

## Requirements
The minimum version of node.js - 13.2.0

## Dependencies
- commander
- js-yaml
- lodash

## devDependencies:
- eslint
- eslint-config-airbnb-base
- eslint-plugin-import
- jest

## Install

### Clone repository
```
git clone git@github.com:DMotorina/frontend-project-46.git
``` 

### Go to the desired folder
```
cd frontend-project-46/
```

### Install make
```
make install
```

### Checking that everything is updated
```
sudo npm link
```

### Run tests
```
make test
```

### Debugging
```
make publish
```

### Checking that everything is updated
```
sudo npm link
```

### Open comparison panel
```
gendiff -h
```

## Compare files. Choose format:
gendiff -f formatName file1.json/.yml file2.json/.yml

### Demonstration JSON/yml files in default('stylish') format:
<a href="https://asciinema.org/a/620055" target="_blank"><img src="https://asciinema.org/a/620055.svg" /></a>

### Demonstration JSON/yml files in plain format:
<a href="https://asciinema.org/a/620056" target="_blank"><img src="https://asciinema.org/a/620056.svg" /></a>

### Demonstration JSON/yml files in json format:
<a href="https://asciinema.org/a/620251" target="_blank"><img src="https://asciinema.org/a/620251.svg" /></a>