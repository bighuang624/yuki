# yuki

一个根据目录内文件生成 README.md 的小工具

[![作者](https:\//img.shields.io\/badge/%E4%BD%9C%E8%80%85-KyonHuang-7AD6FD.svg)](http:\//kyonhuang.top)

## 正在开发中

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

### 修改 yuki.config.json

```json
{
  "title": "测试",
  "repository": "22",
  "only": {
    "dir": [".git"],
    "extname": ["33"],
    "file": [
      "yuki.config.json",
      "README.md",
      ".DS_Store"
    ]
  },
  "ignore": {
    "dir": [".git"],
    "extname": ["33"],
    "file": [
      "yuki.config.json",
      "README.md",
      ".DS_Store"
    ]
  },
  "append": {
    
  }
}
```

### 创建 README.md

```bash
yuki
```

## LICENSE

[Apache License 2.0](https://github.com/bighuang624/yuki/blob/master/LICENSE)
