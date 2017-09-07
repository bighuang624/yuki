#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const dir = path.resolve();
const configFile = path.join(dir, '/yuki.config.json');
const readmeFile = path.join(dir, '/README.md');
const options = {};

function walk(dir, callback) {
  try {
    fs.readdirSync(dir).forEach(function (file) {
      let pathname = path.join(dir, file);

      if (fs.statSync(pathname).isDirectory()) {
        walk(pathname, callback);
      } else {
        callback(pathname);
      }
    });
  }
  catch (e) {
    console.log(e);
  }
}

function readFile(filename, encoding) {
  try {
    return fs.readFileSync(filename).toString(encoding);
  }
  catch (e) {
    return null;
  }
}

/**
 * 写标题
 * @param file  README.md 文件
 * @param title  md 文件各级标题
 * @param level  标题等级
 */
function writeTitle(file, title, level) {
  let data = '';
  while(level-- !== 0) {
    data += '#';
  }
  data += ` ${title}\n\n`;
  fs.appendFile(file, data, (err) => {
    if (err)
      throw err;
  });
}

const config = JSON.parse(readFile(configFile, "utf8"));

if(config) {
  options.title = config.title || path.parse(dir).base;
  options.repository = config.repository || null;
  options.only = config.only || null;
  options.ignore = config.ignore || null;
  options.append = config.append || null;
}

walk(dir, (pathname) => {
  console.log(pathname);
});

writeTitle(readmeFile, options.title, 1);
