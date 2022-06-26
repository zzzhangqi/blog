---
title: 使用Docusaurus搭建个人博客
date: 2022-03-29
authors: Qi
tags: [Docusaurus,blog]
keywords:
  - Docusaurus
  - 搭建个人博客
---

<!-- truncate -->

想搭建个人博客很久了，一直没有找到合适的框架，Hugo、Hexo都看过一些，都不太喜欢，都有些太臃肿了。

有个基于 Hugo 的框架挺喜欢的，是个国外的小伙基于 [LoveIt Theme](https://github.com/dillonzq/LoveIt)，[LeaveIt Theme](https://github.com/liuzc/LeaveIt)，[KeepIt Theme](https://github.com/Fastbyte01/KeepIt) 进行二开的，[FeelIt Theme](https://github.com/khusika/FeelIt)，有兴趣的小伙伴可以看看，整体样式我挺喜欢。

但我本人是个运维，不太懂前端，所以样式改起来也比较麻烦，乱七八糟的看不懂 😂

## 了解 Docusaurus

最近公司使用了 Docusaurus 重构了文档系统，我也参与其中改文档，发现这个框架很简洁，也支持博客，就萌生了使用这个框架搭建博客的念头。

没过多久，我就看到了 [愧怍的博客](https://github.com/kuizuo/blog)，我一看到这个页面就非常喜欢，很简洁，是我喜欢的风格，接下来就是二开。

其实就是换个图，把内容改一改，毕竟我不懂 React。图是在 [Manypixels](https://www.manypixels.co/gallery) 上找的，这个插画图蛮强大的，直接能改颜色，省得我再 PS 了。

换一换文字，改一改配置，对我来说还是比较轻松的，配置在官网上都有 [Docusaurus](https://docusaurus.io/zh-CN/docs)

## 设置 Algolia 搜索

我的建议是直接在 [docsearch](https://docsearch.algolia.com/) 这里申请免费的，点击apply后，填一些信息，大约一两天就会有人回复你的邮件，跟着做就行了。

docsearch 官方会自动爬取你的站点，为你提供搜索。

免去自己注册账号，跑脚本爬索引，有点麻烦。

## 使用 Netlify 部署

我使用的是 [Netlify](https://www.netlify.com/) 免费托管的，每个月有 100G 的流量、300分钟的构建，对于我来说够用了，毕竟是免费的，还有全球的CDN节点。

根据页面提示一步步来就行，什么都不用配置，一步到位，这个体验还是蛮好的。

在第三步的时候提示你绑定自己的域名，根据提示在阿里云解析下就可以用了。

非常简单。

## 最后

到这就部署完了，我的第一个 个人博客搭 建完成，是不是非常 easy。
