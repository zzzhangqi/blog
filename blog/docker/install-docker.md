---
title: 通过脚本安装 Docker
date: 2022-04-29
authors: Qi
tags: [Docker]
keywords:
  - install Docker
---

本文带大家使用 Docker 官方提供的脚本安装 Docker。

<!-- truncate -->

Docker 官方提供了多种方式安装 Docker，二进制、源安装，还有脚本安装。

默认安装

```shell
curl -sfL https://get.docker.com | sh -
```

指定参数

```shell
curl -sfL https://get.docker.com | mirror=Aliyun sh -
```

* mirror 指定安装源，可选 `Aliyun` `AzureChinaCloud`

还有很多可选项，可以看脚本中自行修改。