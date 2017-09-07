const fs = require('fs');

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
 */
function writeTitle(file, title, level) {
  let data = '\n';
  while (level-- !== 0) {
    data += '#';
  }
  data += ` ${title}\n`;
  fs.appendFileSync(file, data);
}

/**
 * 写内容
 * @param file  README.md 文件
 * @param content  内容
 */
function writeContent(file, content) {
  let data = `\n${content}\n`;
  fs.appendFileSync(file, data);
}

/**
 * 写条目
 * @param file  README.md 文件
 * @param item  条目
 */
function writeItem(file, item) {
  let data = `* ${item}\n`;
  fs.appendFileSync(file, data);
}

module.exports = {
  createREADME,
  writeTitle,
  writeContent,
  writeItem
};
