# yuki

一个根据目录内文件生成 README.md 的小工具

[![作者](https:\//img.shields.io\/badge/%E4%BD%9C%E8%80%85-KyonHuang-7AD6FD.svg)](http:\//kyonhuang.top)

## 正在开发中

v0.0.9

#### 需求

找到文件夹下同类型文件，生成 README.md 的目录文件，带有链接。

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
  // README.md h1 大标题
  "title": "《算法（第4版）》笔记及代码",
  // github 库地址，如果配置了这项会给每个文件加上超链接
  "repository": {
    "index": "https://github.com/bighuang624/Algorithms-notes",
    "branch": "master"
  },
  // 需要忽略的目录、扩展名和文件
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
  // 在 README.md 末尾添加的内容
  // 每个对象包含标题、标题等级和内容
  "append": [{
      "title": "维护",
      "level": "2",
      "content": "本文档由 [yuki](https://github.com/bighuang624/yuki) 维护"
    }, {
      "title": "参考资料",
      "level": "2",
      "content": "[算法（第4版）课后练习答案及相关问题解决方案 - 孙强Jimmy的技术博客 - CSDN博客](http://blog.csdn.net/u013541140/article/details/53222770)"
    }
  ]
}
```

### 创建 README.md

```bash
yuki
```

## LICENSE

[Apache License 2.0](https://github.com/bighuang624/yuki/blob/master/LICENSE)
