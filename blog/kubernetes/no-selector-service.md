---
title: 使用 Kubernetes Service 代理外部IP
date: 2022-04-25
authors: Qi
tags: [kubernetes,service]
keywords:
  - 使用Kubernetes Service 代理外部IP
  - Kubernetes
  - Service
---

本篇文章带大家了解如何使用 k8s Service 代理集群外的 IP 到集群内部使用。

<!-- truncate -->

Endpoints 资源一般不用我们手动创建，在创建 Service 的时候指定了 Pod 的 Selector，会自动创建对应的 Endpoints，Endpoints 中的 IP 是每个 Pod 的 IP，K8s通过自身的机制动态识别 Pod IP 的变化并应用于 Endpoints。

那么如果 Endpoints 的 IP 我们手动指定就可以代理 k8s 集群外的 IP 到集群内部中使用。


## 代理外部 IP

代理 k8s 集群外的 IP 示例：

通常我们在写 Service 的时候需要指定 Selector，现在则不需要。

保持 `metadata.name` 一致即可。

```yaml title="kubectl apply -f svc.yaml"
apiVersion: v1
kind: Service
metadata:
  name: zq
  namespace: zq
spec:
  ports:
  - name: http
    protocol: TCP
    port: 8080
    targetPort: 8080

---

apiVersion: v1
kind: Endpoints
metadata:
  name: zq
  namespace: zq
subsets:
  - addresses:
      - ip: 192.168.3.66
    ports:
    - name: http
      port: 8080
      protocol: TCP
```

## 代理多个外部 IP

Endpoints 也可以代理多个外部 IP，可以当负载均衡使用。

```yaml title="kubectl apply -f svc.yaml"
apiVersion: v1
kind: Service
metadata:
  name: zq
  namespace: zq
spec:
  ports:
  - name: http
    protocol: TCP
    port: 8080
    targetPort: 8080

---

apiVersion: v1
kind: Endpoints
metadata:
  name: zq
  namespace: zq
subsets:
  - addresses:
      - ip: 192.168.3.66
      - ip: 192.168.3.67
      - ip: 192.168.3.68
    ports:
    - name: http
      port: 8080
      protocol: TCP
```


参考官方文档：https://kubernetes.io/zh/docs/concepts/services-networking/service/#services-without-selectors