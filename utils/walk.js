const fs = require('fs');
const path = require('path');
const options = require('./config');

const rootDir = path.resolve();
let rootSrc;

if(options.repository && options.repository.index) {
  if(!options.repository.branch)
    options.repository.branch = 'master';
  rootSrc = `${options.repository.index}/blob/${options.repository.branch}`;
}

function walk(dir, dirCallback, fileCallback, level) {
  try {
    fs.readdirSync(dir).forEach(function (file) {

      let pathname = path.join(dir, file);

      if (fs.statSync(pathname).isDirectory()) {

        if(options.ignore && options.ignore.dir) {

          let isDirIgnored = false,
            newLevel = level + 1;
          options.ignore.dir.forEach((item) => {
            (pathname.indexOf(item) !== -1) && (isDirIgnored = true);
          });
          (!isDirIgnored) && dirCallback(file, newLevel) && walk(pathname, dirCallback, fileCallback, newLevel);
        }
        else {
          let newLevel = level + 1;
          dirCallback(file, newLevel) && walk(pathname, dirCallback, fileCallback, newLevel);
        }
      }

      else {

        let src = pathname.replace(rootDir, '');

        if(options.ignore && (options.ignore.file || options.ignore.extname)) {

          let isFileIgnored = false,
            isExtnameIgnored = false;

          options.ignore.file.forEach((item) => {
            (pathname.indexOf(item) !== -1) && (isFileIgnored = true);
            (path.parse(dir).ext === options.ignore.extname) && (isExtnameIgnored = true);
          });
          (!isFileIgnored) && (!isExtnameIgnored) && (function () {
            if(rootSrc)
              fileCallback(`[${file}](${rootSrc}${src})`);
            else
              fileCallback(file);
          })();
        }

        else {
          if(rootSrc)
            fileCallback(`[${file}](${rootSrc}${src})`);
          else
            fileCallback(file);
        }
      }

    });
  }
  catch (err) {
    console.log(err);
  }
}

module.exports = {
  walk
};
