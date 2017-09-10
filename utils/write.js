const fs = require('fs');
const linebreak = (process.platform === 'win32') ? '\r\n' : '\n';

function createREADME(file) {
  try {
    fs.unlinkSync(file);
  }
  catch (err) {
    console.log('README.md 文件不存在，构建中...');
  }
}

/**
 * 写标题
 * @param file  README.md 文件
 * @param title  md 文件各级标题
 * @param level  标题等级
 * @param breakline  在目录整理时为 true，以排版
 */
function writeTitle(file, title, level, breakline) {
  let data = breakline ? linebreak : '';
  while (level-- !== 0) {
    data += '#';
  }
  data += ` ${title}${linebreak}${linebreak}`;
  fs.appendFileSync(file, data);
}

/**
 * 写内容
 * @param file  README.md 文件
 * @param content  内容
 */
function writeContent(file, content) {
  let data = `${content}${linebreak}${linebreak}`;
  fs.appendFileSync(file, data);
}

/**
 * 写条目
 * @param file  README.md 文件
 * @param item  条目
 */
function writeItem(file, item) {
  let data = `* ${item}${linebreak}`;
  fs.appendFileSync(file, data);
}

function writeLinebreak(file) {
  fs.appendFileSync(file, linebreak);
}

module.exports = {
  createREADME,
  writeTitle,
  writeContent,
  writeItem,
  writeLinebreak
};
