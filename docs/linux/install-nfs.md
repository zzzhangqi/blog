---
title: 在Linux上安装 NFS-Server
description: 在Linux上安装NFS-Server
keywords:
  - NFS
  - Linux
---

## 安装nfs-utils

- 在集群每一个节点安装`nfs-utils`

```bash
yum install -y nfs-utils
```

## 配置nfs-server

- 创建共享目录

```bash
mkdir -p /data
```

- 编辑`/etc/exports`文件添加需要共享目录，每个目录的设置独占一行，编写格式如下：

```bash
vim /etc/exports
NFS共享目录路径 客户机IP段(参数1,参数2,...,参数n)
```

- 例如：

```bash
/u01 192.168.1.1/16(rw,sync,insecure,no_subtree_check,no_root_squash)
```

  | 参数             | 说明                                                         |
  | :--------------- | :----------------------------------------------------------- |
  | ro               | 只读访问                                                     |
  | rw               | 读写访问                                                     |
  | sync             | 所有数据在请求时写入共享                                     |
  | async            | nfs在写入数据前可以响应请求                                  |
  | secure           | nfs通过1024以下的安全TCP/IP端口发送                          |
  | insecure         | nfs通过1024以上的端口发送                                    |
  | wdelay           | 如果多个用户要写入nfs目录，则归组写入（默认）                |
  | no_wdelay        | 如果多个用户要写入nfs目录，则立即写入，当使用async时，无需此设置 |
  | hide             | 在nfs共享目录中不共享其子目录                                |
  | no_hide          | 共享nfs目录的子目录                                          |
  | subtree_check    | 如果共享/usr/bin之类的子目录时，强制nfs检查父目录的权限（默认） |
  | no_subtree_check | 不检查父目录权限                                             |
  | all_squash       | 共享文件的UID和GID映射匿名用户anonymous，适合公用目录        |
  | no_all_squash    | 保留共享文件的UID和GID（默认）                               |
  | root_squash      | root用户的所有请求映射成如anonymous用户一样的权限（默认）    |
  | no_root_squash   | root用户具有根目录的完全管理访问权限                         |
  | anonuid=xxx      | 指定nfs服务器/etc/passwd文件中匿名用户的UID                  |
  | anongid=xxx      | 指定nfs服务器/etc/passwd文件中匿名用户的GID                  |

  - 注1：尽量指定IP段最小化授权可以访问NFS 挂载的资源的客户端
  - 注2：经测试参数insecure必须要加，否则客户端挂载出错mount.nfs: access denied by server while mounting

## 启动NFS服务

- 配置完成后，您可以在终端提示符后运行以下命令来启动 NFS 服务器：

```bash
systemctl enable nfs-server
systemctl start nfs-server
```

## 检查NFS服务提供是否正常

- 到客户机上执行showmount命令进行检查

```bash
$ showmount -e <NFS服务器IP地址>
Exports list on <NFS服务器IP地址>:
/data
```


