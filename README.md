# MicroService Boilerplate

[![Build Status][build-badge]][build]
[![Code Coverage][coverage-badge]][coverage]
[![Dependencies][dependencyci-badge]][dependencyci]
[![Greenkeeper badge][greenkeeper-badge]][greenkeeper]
[![Sync Vulnerabilities][synk-badge]][synk-project]
[![version][version-badge]][package]
[![MIT License][license-badge]][LICENSE]

[![All Contributors][contributors]](#contributors)
[![PRs Welcome][prs-badge]][prs]
[![Code of Conduct][coc-badge]][coc]

[![Watch on GitHub][github-watch-badge]][github-watch]
[![Star on GitHub][github-star-badge]][github-star]

> A restify boilerplate for micro-services

Used as a starting point for all NodeJS micro-services.

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


## Contributors

Thanks goes to these wonderful people ([emoji key][emojis]):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
| [<img src="https://avatars2.githubusercontent.com/u/649578?v=3" width="100px;"/><br /><sub>Jeff Detmer</sub>](http://www.jeffdetmer.com)<br />[💻](https://github.com/shellthor/microservice-boilerplate/commits?author=shellthor "Code") [📖](https://github.com/shellthor/microservice-boilerplate/commits?author=shellthor "Documentation") [⚠️](https://github.com/shellthor/microservice-boilerplate/commits?author=shellthor "Tests") [📢](#talk-shellthor "Talks") |
| :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors][all-contributors] specification. Contributions of any kind welcome!

## Sponsors

<a href="https://app.codesponsor.io/link/YwpXR8o4sTRwPPnBH7sSn88F/shellthor/restify-boilerplate" rel="nofollow"><img src="https://app.codesponsor.io/embed/YwpXR8o4sTRwPPnBH7sSn88F/shellthor/restify-boilerplate.svg" style="width: 888px; height: 68px;" alt="Sponsor" /></a>

## License

MIT &copy; Jeff Detmer

[build-badge]: https://img.shields.io/travis/shellthor/restify-boilerplate.svg?style=flat-square
[build]: https://travis-ci.org/shellthor/restify-boilerplate
[coverage-badge]: https://img.shields.io/codecov/c/github/shellthor/restify-boilerplate.svg?style=flat-square
[coverage]: https://codecov.io/github/shellthor/restify-boilerplate
[dependencyci-badge]: https://dependencyci.com/github/shellthor/restify-boilerplate/badge
[dependencyci]: https://dependencyci.com/github/shellthor/restify-boilerplate
[greenkeeper-badge]: https://badges.greenkeeper.io/shellthor/restify-boilerplate.svg?style=flat-square
[greenkeeper]: https://greenkeeper.io/
[version-badge]: https://img.shields.io/github/tag/shellthor/restify-boilerplate.svg?style=flat-square
[package]: https://github.com/shellthor/restify-boilerplate
[license-badge]: https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square
[license]: https://github.com/shellthor/restify-boilerplate/blob/master/LICENSE.md
[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[prs]: http://makeapullrequest.com
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/shellthor/restify-boileplate/blob/master/CODE_OF_CONDUCT.md
[github-watch-badge]: https://img.shields.io/github/watchers/shellthor/restify-boilerplate.svg?style=flat-square
[github-watch]: https://github.com/shellthor/restify-boilerplate/watchers
[github-star-badge]: https://img.shields.io/github/stars/shellthor/restify-boilerplate.svg?style=flat-square
[github-star]: https://github.com/shellthor/restify-boilerplate/stargazers
[emojis]: https://github.com/kentcdodds/all-contributors#emoji-key
[all-contributors]: https://github.com/kentcdodds/all-contributors
[contributors]: https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square
[synk-badge]: https://snyk.io/test/github/shellthor/restify-boilerplate/badge.svg?style=flat-square
[synk-project]: https://snyk.io/test/github/shellthor/restify-boilerplate
