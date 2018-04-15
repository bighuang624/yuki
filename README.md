<h1 align="center">yuki</h1>

<p align="center">使用 Node.js 开发的项目目录管理工具，能够将项目内文件结构自动映射并生成为 README.md</p>

<p align="center">
<a href="http://kyonhuang.top"><img src="https://img.shields.io/badge/%E4%BD%9C%E8%80%85-KyonHuang-7AD6FD.svg" alt="Author"></a>
<a href="https://www.npmjs.com/package/yuki"><img src="https://img.shields.io/npm/v/yuki.svg" alt="Version"></a>
<a href="https://github.com/bighuang624/yuki/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/yuki.svg" alt="License"></a>
</p>

<p align="center">
<img src="https://raw.githubusercontent.com/bighuang624/yuki/master/example.gif">
</p>

## 适用场合

当一份 README.md 的主体内容是项目目录，而你又厌倦了每次增加、修改、删除项目中文件时都要对 README 进行维护，那么不妨试试 yuki！

它可以在极短时间内帮你生成符合要求的 README.md 文档。你更可以通过配置一份 yuki.config.json 来满足你的以下需求：

* 固定文档标题
* 目录前后增加固定内容
* 映射时忽略指定文件夹、文件、扩展名
* 根据指定扩展名选择是否去掉文件名的扩展名或加上书名号
* 让每个文件都带上 Github 的链接以方便在线跳转查看

你可以用 yuki 帮助你轻松维护 github 上类似博客、笔记、代码汇总等项目！

## 效果示例

我的[每天一题 LeetCode](https://github.com/bighuang624/LeetCode-everyday)项目的 README.md 完全通过 yuki 生成。你可以点击以查看效果。

## 使用方法

请确认你使用的电脑有 Node 环境，越新越好。

### 安装 yuki

```bash
npm install -g yuki
```

### 进入需要生成 README.md 的文件夹

```bash
# 请将 <dirname> 换为文件夹路径
cd <dirname>
```

### 创建 yuki.config.json（可选）

```bash
touch yuki.config.json
```

### 配置 yuki.config.json（可选）

```
{
  // README.md的大标题（h1），默认为所在文件夹名
  "title": "《算法（第4版）》笔记及代码",
  // github库地址，如果配置了这项会给每个文件加上超链接
  // 如果配置，请保证index填写无误，且所有文件名不含空格（否则链接无法正确表示）
  // branch默认为master
  "repository": {
    "index": "https://github.com/bighuang624/Algorithms-notes",
    "branch": "master"
  },
  // 目录开始的标题等级
  // 默认为2，即该目录下的文件夹名等级从3开始，随层级深入递减
  "startLevel": 2,
  // 需要忽略的目录、扩展名和文件，都以数组表示
  "ignore": {
    "dir": [".git"],
    "extname": [".json"],
    "file": [
      "yuki.config.json",
      ".gitignore",
      "README.md",
      ".DS_Store"
    ]
  },
  // 根据扩展名选择对展示的文件名做一些处理
  // 每个扩展名的配置需要单独一个对象
  // 目前支持省略扩展名"withoutExt": true
  // 和加上书名号"withBookmark": true
  "format": [
    {
      "extname": ".md",
      "withoutExt": true,
      "withBookmark": true
    }
  ],
  // 在大标题之后，目录之前添加的内容
  // 每个对象可选择包含标题、标题等级和内容
  // 其中，标题和标题等级需在一个对象中一同填写
  "prefix": [
    {
      "content": "[![作者](https:\//img.shields.io\/badge/%E4%BD%9C%E8%80%85-KyonHuang-7AD6FD.svg)](http:\//kyonhuang.top)"
    }, {
      "title": "目录",
      "level": 2
    }
  ],
  // 在README.md末尾添加的内容
  // 和prefix相同，每个对象可选择包含标题、标题等级和内容
  "append": [
    {
      "title": "维护",
      "level": 2,
      "content": "本文档由 [yuki](https://github.com/bighuang624/yuki) 维护"
    }
  ]
}
```

因为 JSON 标准中不含注释，请在使用时将注释去掉。本项目中也提供一份不带注释、可供修改使用的 yuki.config.json 模版。

不需要的配置选项请全部删除。

### 创建 README.md

```bash
yuki
```

## 注意事项

* 生成的文档中文件和文件夹按照名称顺序排列
* 如果你觉得这个小工具还不错，或者使用时觉得很方便、减轻了重复的工作负担，那么不妨**点一个 star 作为鼓励**
* 欢迎开 issue 或者提交 PR 

## LICENSE

[Apache License 2.0](https://github.com/bighuang624/yuki/blob/master/LICENSE)
