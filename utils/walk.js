const fs = require('fs');
const path = require('path');
const options = require('./config');

const rootDir = path.resolve();
let rootSrc;

if(options.repository) {
  rootSrc = `${options.repository.index}/blob/${options.repository.branch}`;
}

function walk(dir, dirCallback, fileCallback, level) {
  try {
    fs.readdirSync(dir).forEach(function (file) {

      let pathname = path.join(dir, file);

      if (fs.statSync(pathname).isDirectory()) {
        options.ignore.dir && (function (){

          let isDirIgnored = false,
              newLevel = level + 1;
          options.ignore.dir.forEach((item) => {
            (pathname.indexOf(item) !== -1) && (isDirIgnored = true);
          });
          (!isDirIgnored) && dirCallback(file, newLevel) && walk(pathname, dirCallback, fileCallback, newLevel);

        })();
      }

      else {
        (options.ignore.file || options.ignore.extname) && (function (){

          let isFileIgnored = false,
            isExtnameIgnored = false;
          let src = pathname.replace(rootDir, '');

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

        })();
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
