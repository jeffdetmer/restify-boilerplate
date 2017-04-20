# MicroService Boilerplate

> A restify boilerplate for micro-services

Used as a starting point for all NodeJS micro-services.

[![Build Status](https://travis-ci.org/shellthor/microservice-boilerplate.svg?branch=master)](https://travis-ci.org/shellthor/microservice-boilerplate)

[![codecov](https://codecov.io/gh/shellthor/microservice-boilerplate/branch/master/graph/badge.svg)](https://codecov.io/gh/shellthor/microservice-boilerplate)


## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Contribute](#contribute)
- [License](#license)

## Install

Install all of the pre-requisites and then install the dependencies.

### Install NVM or Nodist

`for OSX or Linux`
> Follow the installation instructions for [nvm](https://github.com/creationix/nvm)

`for Windows`
> Follow the installation instructions for [nodist](https://github.com/marcelklehr/nodist)

Install the latest LTS version of node using the installed version manager.

### Install Yarn

```
npm install -g yarn
```

### Replace package name

1. Replace `service-boilerplate` in the `package.json` file with your package name
2. Ensure the git repository is correct in `package.json`

### Install dependencies

```
yarn install
```

## Usage

### List all scripts

```
yarn run info
```

### Run a development server

```
yarn run start
```

### Execute all tests

```
yarn run test
```

### Build application

```
yarn run build
```

### Configure the server

This project uses [Confidence](https://www.npmjs.com/package/confidence) for environment configuration

* Modify `src/config/index.js` to add any additional configurations or environments
* If adding a new environment, create a new `start:<env>` script in `package.json`


## Contribute

PRs accepted.

## License

MIT © Jeff Detmer
