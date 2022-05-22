---
title: 在 Kubernetes 上部署 Traefik 2.6
date: 2022-05-21
authors: Qi
tags: [traefik]
keywords:
  - 部署 Traefik 2.6
---

在 Kubernetes 上安装 Traefik 2.6

<!-- truncate -->

## 前提条件

使用 Helm 部署 Traefik 2.6 有以下条件：

* Kubernetes 1.14+
* [Helm](https://helm.sh/docs/intro/install/) Version 3.x is

## 部署 Traefik 2.6

### 添加 Helm 仓库

添加 Helm 官方仓库

```shell
helm repo add traefik https://helm.traefik.io/traefik
```

如果你之前添加过该仓库，则需要更新仓库

```shell
helm repo update
```

### 创建 Values.yaml 文件

如果使用默认的参数部署，那么会创建一个 LoadBalancer 的 Service，并且是 NodePort，我们想让 Traefik 用作集群的网关使用，那么默认安装显然是不行的，所以我们需要修改 `values.yaml` 文件

```yaml title="vim values.yaml"
deployment:
  initContainers:
    - name: volume-permissions
      image: busybox:1.31.1
      command: ["sh", "-c", "chmod -Rv 600 /data/*"]
      volumeMounts:
        - name: data
          mountPath: /data
service:
  enabled: false
ingressRoute:
  dashboard:
    enabled: false
logs:
  general:
    level: INFO
  access:
    enabled: true
ports:
  web:
    port: 80
  websecure:
    port: 443
hostNetwork: true
persistence:
  accessMode: ReadWriteOnce
  enabled: true
  storageClass: <StorageClassName>
  size: 1G
securityContext:
  capabilities:
    drop: [ALL]
    add: [NET_BIND_SERVICE]
  readOnlyRootFilesystem: true
  runAsGroup: 0
  runAsNonRoot: false
  runAsUser: 0
podSecurityContext:
  fsGroup: 0
additionalArguments:
  - "--serversTransport.insecureSkipVerify=true"
  - "--api.insecure=true"
  - "--api.dashboard=true"
```

以上 `values.yaml` 需要你定义自己的 `StorageClassName`，如果不想挂载 `volume`，可以使用以下文件：

```yaml title="vim values.yaml"
service:
  enabled: false
ingressRoute:
  dashboard:
    enabled: false
logs:
  general:
    level: INFO
  access:
    enabled: true
ports:
  web:
    port: 80
  websecure:
    port: 443
hostNetwork: true
persistence:
  enabled: false
securityContext:
  capabilities:
    drop: [ALL]
    add: [NET_BIND_SERVICE]
  readOnlyRootFilesystem: true
  runAsGroup: 0
  runAsNonRoot: false
  runAsUser: 0
podSecurityContext:
  fsGroup: 0
additionalArguments:
  - "--serversTransport.insecureSkipVerify=true"
  - "--api.insecure=true"
  - "--api.dashboard=true"
```

### 安装 Traefik

创建 traefik 命名空间

```shell
kubectl create ns traefik
```

指定 `values.yaml` 文件部署 Traefik

```shell
helm install traefik traefik/traefik -f values.yaml --namespace traefik
```

执行完命令后，只会创建一个 POD，如下：

```shell
[root@zq ~]# kubectl get all -n traefik
NAME                           READY   STATUS    RESTARTS   AGE
pod/traefik-7fbb4f6fb8-vkjxn   1/1     Running   0          3m4s

NAME                      READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/traefik   1/1     1            1           3m4s

NAME                                 DESIRED   CURRENT   READY   AGE
replicaset.apps/traefik-7fbb4f6fb8   1         1         1       3m4s
```

并且 Traefik 的 `80` `443` `9000` `9100` 端口会在宿主机上进行监听

```shell
tcp6       0      0 :::9000                 :::*                    LISTEN      21107/traefik
tcp6       0      0 :::9100                 :::*                    LISTEN      21107/traefik
tcp6       0      0 :::80                   :::*                    LISTEN      21107/traefik
tcp6       0      0 :::443                  :::*                    LISTEN      21107/traefik
```

接下来我们就可以通过 `主机IP:9000/dashboard/` 访问 Traefik 仪表盘，如下：

![](https://image.smallq.cn/image/image-20220522185643014.png)
