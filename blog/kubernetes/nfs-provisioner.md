---
title: Kubernetes NFS Provisioner
date: 2022-05-05
authors: Qi
tags: [kubernetes,NFS]
keywords:
  - Kubernetes NFS Provisioner
  - Kubernetes
---

本文讲解 Kubernetes NFS Provisioner 的使用

<!-- truncate -->

:::tip
更多使用方法请参考官方 Github：https://github.com/kubernetes-sigs/nfs-subdir-external-provisioner

官方仓库的镜像来自 k8s.gcr.io，国内无法访问，因此我将镜像 Push 到了我的 Docker Hub上，包括Helm包。

Arm64的镜像为 `v4.0.2-arm64`
:::

## 使用 Helm 部署

* 添加 Helm 仓库

```shell
helm repo add smallq https://chart.smallq.cn
```
* 使用 Helm 安装 NFS Provisioner

```shell
helm install nfs-provisioner smallq/nfs-subdir-external-provisioner \
    --set nfs.server=x.x.x.x \
    --set nfs.path=/exported/path
```

* 使用 Arm 镜像

```shell
helm install nfs-provisioner smallq/nfs-subdir-external-provisioner \
    --set image.tag=v4.0.2-arm64 \
    --set nfs.server=x.x.x.x \
    --set nfs.path=/exported/path
```

## 使用 Yaml 部署

```yaml
kind: Deployment
apiVersion: apps/v1
metadata:
  name: nfs-client-provisioner
spec:
  replicas: 1
  selector:
    matchLabels:
      app: nfs-client-provisioner
  strategy:
    type: Recreate
  template:
    metadata:
      labels:
        app: nfs-client-provisioner
    spec:
      serviceAccountName: nfs-client-provisioner
      containers:
        - name: nfs-client-provisioner
          image: qlucky/nfs-subdir-external-provisioner:v4.0.2
          volumeMounts:
            - name: nfs-client-root
              mountPath: /persistentvolumes
          env:
            - name: PROVISIONER_NAME
              value: k8s-sigs.io/nfs-subdir-external-provisioner
            - name: NFS_SERVER
              value: <YOUR NFS SERVER HOSTNAME>
            - name: NFS_PATH
              value: /var/nfs
      volumes:
        - name: nfs-client-root
          nfs:
            server: <YOUR NFS SERVER HOSTNAME>
            path: /var/nfs
```