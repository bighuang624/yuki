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
    let dirQueue = [];

    fs.readdirSync(dir).forEach(function (file) {

      let pathname = path.join(dir, file);

      if (fs.statSync(pathname).isDirectory()) {

        if(options.ignore && options.ignore.dir) {

          let isDirIgnored = false;
          options.ignore.dir.forEach((item) => {
            (pathname.indexOf(item) !== -1) && (isDirIgnored = true);
          });
          (!isDirIgnored) && dirQueue.push({ pathname, file });
        }
        else {
          dirQueue.push({ pathname, file });
        }
      }

      else {

        let src = pathname.replace(rootDir, '');

        if(options.ignore && (options.ignore.file || options.ignore.extname)) {

          let isFileIgnored = false,
            isExtnameIgnored = false;

          options.ignore.file && options.ignore.file.forEach((item) => {
            (pathname.indexOf(item) !== -1) && (isFileIgnored = true);
          });
          options.ignore.extname && options.ignore.extname.forEach((item) => {
            (path.parse(pathname).ext === item) && (isExtnameIgnored = true);
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

    dirQueue.forEach((dir) => {
      let newLevel = level + 1;
      dirCallback(dir.file, newLevel) && walk(dir.pathname, dirCallback, fileCallback, newLevel);
    });
  }
  catch (err) {
    console.log(err);
  }
}

module.exports = {
  walk
};
