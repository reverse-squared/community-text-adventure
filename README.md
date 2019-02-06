# community-text-adventure
![status](https://img.shields.io/badge/status-complete-brightgreen.svg)
![maintained](https://img.shields.io/badge/maintained-no%20(as%20of%202019)-red.svg)

[![GitHub issues](https://img.shields.io/github/issues/WeAreDevs/community-text-adventure.svg)](https://github.com/WeAreDevs/community-text-adventure)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/WeAreDevs/community-text-adventure.svg)](https://github.com/WeAreDevs/community-text-adventure)
[![GitHub](https://img.shields.io/github/license/WeAreDevs/community-text-adventure.svg)](https://github.com/WeAreDevs/community-text-adventure)

[![Build Status](https://travis-ci.com/WeAreDevs/community-text-adventure.svg?branch=master)](https://travis-ci.com/WeAreDevs/community-text-adventure)
[![Build Status](https://travis-ci.com/WeAreDevs/community-text-adventure.svg?branch=development)](https://travis-ci.com/WeAreDevs/community-text-adventure)
[![dependencies Status](https://david-dm.org/WeAreDevs/community-text-adventure/status.svg)](https://david-dm.org/WeAreDevs/community-text-adventure)
[![devDependencies Status](https://david-dm.org/WeAreDevs/community-text-adventure/dev-status.svg)](https://david-dm.org/WeAreDevs/community-text-adventure?type=dev)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/d2c0a43362774f34b24f01b0e3a628ec)](https://www.codacy.com/app/WeAreDevs/community-text-adventure?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=hparcells/community-text-adventure&amp;utm_campaign=Badge_Grade)

A text adventure game decided by the people.

## Contributors
[View Here](http://text-adventure.netlify.com/#credits)

## NPM Scripts
Basic Development
  - `npm start` starts a development server

Production Build
  - `npm run build` builds a production build into `./dist`

ESLint and Code Style
  - `npm run lint` runs eslint
  - `npm run lint-fix` runs eslint with auto-fix

Unit Testing
  - `npm run test` runs the tests

There are a couple extra NPM Scripts which do useful things, but they require extra dependencies installed:
  - `npm run cloc` runs Count Lines of Code, which can be installed with `npm i -g cloc` (requires perl also)
  - `npm run gource` runs Gource, a visualization tool, and outputs a mp4 at `gource.mp4`
    - It requires Gource to be installed already
    - If running on windows, you need to also install ffmpeg
    - If running on linux, you need to install libav, details inside `make-gource-mp4.sh`