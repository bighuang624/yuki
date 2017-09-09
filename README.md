<h1 align="center">yuki</h1>

<p align="center">使用 Node.js 开发的项目目录管理工具，能够将项目内文件结构映射到 README.md</p>

<p align="center">
<a href="http://kyonhuang.top"><img src="https://img.shields.io/badge/%E4%BD%9C%E8%80%85-KyonHuang-7AD6FD.svg" alt="Author"></a>
<a href="https://www.npmjs.com/package/yuki"><img src="https://img.shields.io/npm/v/yuki.svg" alt="Version"></a>
<a href="https://github.com/bighuang624/yuki/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/yuki.svg" alt="License"></a>
</p>

## 正在开发中

若版本号仍低于 1.0.0，请不要使用。

### 需求

* 样式整理
* 根目录文件放在最前（每进入一个文件夹，先遍历文件，再遍历目录）

## 使用方法

### 安装 yuki

```bash
npm install -g yuki
```

### 进入需要生成 README.md 的文件夹

```bash
# 请将 <dirname> 换为文件夹路径
cd <dirname>
```

### 创建 yuki.config.json

```bash
touch yuki.config.json
```

### 配置 yuki.config.json

```json
{
  // README.md h1 大标题，默认为所在文件夹名
  "title": "《算法（第4版）》笔记及代码",
  // github 库地址，如果配置了这项会给每个文件加上超链接
  "repository": {
    "index": "https://github.com/bighuang624/Algorithms-notes",
    "branch": "master"
  },
  // 目录开始的标题等级，默认为 1，即该目录下的文件夹名等级为 2
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
  // 在大标题之后，目录之前添加的内容
  // 每个对象可选择包含标题、标题等级和内容
  "prefix": [{
      "content": "[![作者](https:\//img.shields.io\/badge/%E4%BD%9C%E8%80%85-KyonHuang-7AD6FD.svg)](http:\//kyonhuang.top)"
    }, {
      "title": "目录",
      "level": "2"
    }
  ],
  // 在 README.md 末尾添加的内容
  // 和 prefix 相同，每个对象可选择包含标题、标题等级和内容
  "append": [{
      "title": "维护",
      "level": "2",
      "content": "本文档由 [yuki](https://github.com/bighuang624/yuki) 维护"
    }
  ]
}
```

因为 JSON 标准中不含注释，请在使用时将注释去掉。本项目中也提供一份不带注释、可供修改使用的 yuki.config.json 模版。

### 创建 README.md

```bash
yuki
```

## LICENSE

[Apache License 2.0](https://github.com/bighuang624/yuki/blob/master/LICENSE)
