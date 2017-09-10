#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const {walk} = require('./utils/walk');
const {createREADME, writeTitle, writeContent, writeItem, writeLinebreak} = require('./utils/write');
const options = require('./utils/config');

const dir = path.resolve();
const readmeFile = path.join(dir, '/README.md');

createREADME(readmeFile);
writeTitle(readmeFile, options.title, 1);

/**
 * 将文件夹映射为标题
 * @param dir
 * @param level
 * @returns {boolean}  返回真值以执行后面的函数
 */
function mapDir(dir, level) {
  writeTitle(readmeFile, dir, level, true);
  return true;
}

/**
 * 将文件映射为条目
 * @param file
 * @returns {boolean}  返回真值以执行后面的函数
 */
function mapFile(file) {
  writeItem(readmeFile, file);
  return true;
}

/**
 * 写前置或后置的附加内容
 * @param item
 */
function addContent(item) {
  if (item.title && item.level)
    writeTitle(readmeFile, item.title, item.level);
  if (item.content)
    writeContent(readmeFile, item.content);
}

/**
 * 写前置的附加内容
 */
if (options.prefix) {
  options.prefix.forEach(addContent);
}

/**
 * 文件和目录遍历
 */
let topLevel = options.startLevel || 2;
walk(dir, mapDir, mapFile, topLevel);
writeLinebreak(readmeFile);

/**
 * 写后置的附加内容
 */
if (options.append) {
  options.append.forEach(addContent);
}

console.log('README.md 文件构建成功！');
