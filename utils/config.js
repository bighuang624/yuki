const fs = require('fs');
const path = require('path');

const dir = path.resolve();
const configFile = path.join(dir, '/yuki.config.json');

const options = {};

function readFile(filename, encoding) {
  try {
    return fs.readFileSync(filename).toString(encoding);
  }
  catch (err) {
    return null;
  }
}

const config = JSON.parse(readFile(configFile, "utf8"));

options.title = path.parse(dir).base;

if (config) {
  options.title = config.title || path.parse(dir).base;
  options.repository = config.repository || null;
  options.startLevel = config.startLevel || null;
  options.ignore = config.ignore || null;
  options.prefix = config.prefix || null;
  options.append = config.append || null;
}

module.exports = options;
