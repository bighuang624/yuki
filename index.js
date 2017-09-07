#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const {walk} = require('./utils/walk');
const {createREADME, writeTitle, writeContent, writeItem} = require('./utils/write');
const options = require('./utils/config');

const dir = path.resolve();
const readmeFile = path.join(dir, '/README.md');

createREADME(readmeFile);
writeTitle(readmeFile, options.title, 1);

function mapDir(dir) {
  writeTitle(readmeFile, dir, 3);
  return true;
}

function mapFile(file) {
  writeItem(readmeFile, file);
  return true;
}

walk(dir, mapDir, mapFile);

if (options.append) {
  options.append.forEach((item) => {
    writeTitle(readmeFile, item.title, item.level);
    writeContent(readmeFile, item.content);
  });
}

console.log('README.md 文件构建成功！');
