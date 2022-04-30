---
title: Minio + uPic + Typora 搭建图床
date: 2022-04-30
authors: Qi
tags: [minio]
keywords:
  - Minio + uPic + Typora 搭建图床
  - Minio
  - uPic
  - Typora
---

本文将使用 Minio + uPic + Typora 搭建属于自己的图床。

<!-- truncate -->

免费的图床有很多，比如 SMMS等。

也可以通过 Github、Gitee搭建图床。

但以上的免费图床：

1. SMMS不稳定，经常访问不到。
2. Github 在国内也是经常访问不到。
3. Gitee个人账户有仓库限制 5G。

那么如果有一台服务器呢，就可以搭建自己的图床，解决以上所有问题，还能享受搭建的过程，很nice😁。

## 安装 Docker

安装 Docker 参考 [通过脚本安装 Docker](/docker/install-docker)

## 搭建 Minio

官网支持多种搭建方式，这里我使用 Docker 搭建。

搭建 Minio，以下命令来源以 [官网文档](https://docs.min.io/minio/baremetal/quickstart/container.html) 

```shell
mkdir -p ~/minio/data

docker run \
   -p 9000:9000 \
   -p 9090:9090 \
   --name minio \
   -v ~/minio/data:/data \
   -e "MINIO_ROOT_USER=ROOTNAME`" \
   -e "MINIO_ROOT_PASSWORD=CHANGEME123" \
   quay.io/minio/minio server /data --console-address ":9090"
```

访问 IP:9090 端口，进入 Minio 控制台中

1. 创建一个 `Buckets` 
2. 点击 `Manage`，配置桶
3. 将 `Access Policy` 设置为 `public`

设置了桶为公开之后就可以通过 IP + 桶名称 + 图片名进行访问。

例如：https://image.smallq.cn/image/image-20220430163941469.png

1. `https://image.smallq.cn`  域名
2. `image` 桶名称
3. `image-20220430163941469.png` 图片名称

![](https://image.smallq.cn/image/image-20220430163941469.png)



## 安装 uPic

参考 https://github.com/gee1k/uPic 安装uPic客户端。

配置使用 Minio，Minio支持标准的 S3 存储，我们添加一个亚马逊的，配置参考:point_down:

<img src="https://image.smallq.cn/image/image-20220430171744074.png" width="67%" />

## 配置 Typora

<img src="https://image.smallq.cn/image/image-20220430172222080.png" width="67%" />

配置完成之后，我们截图粘贴到 Typora 中的时候可以直接上传图片到图床中。

<img src="https://image.smallq.cn/image/image-20220430172655453.png" width="80%" />
