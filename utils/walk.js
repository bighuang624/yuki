const fs = require('fs');
const path = require('path');
const options = require('./config');


function walk(dir, dirCallback, fileCallback) {
  try {
    fs.readdirSync(dir).forEach(function (file) {

      let pathname = path.join(dir, file);

      if (fs.statSync(pathname).isDirectory()) {
        options.ignore.dir && (function (){
          let isDirIgnored = false;
          options.ignore.dir.forEach((item) => {
            (pathname.indexOf(item) !== -1) && (isDirIgnored = true);
          });
          (!isDirIgnored) && walk(pathname, dirCallback, fileCallback);
        })();
      }

      else {
        (options.ignore.file || options.ignore.extname) && (function (){
          let isFileIgnored = false,
            isExtnameIgnored = false;
          options.ignore.file.forEach((item) => {
            (pathname.indexOf(item) !== -1) && (isFileIgnored = true);
            (path.parse(dir).ext === options.ignore.extname) && (isExtnameIgnored = true);
          });
          (!isFileIgnored) && (!isExtnameIgnored) && fileCallback(file);
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
