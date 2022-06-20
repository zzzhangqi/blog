---
title: K3s 调整节点驱逐阀值
date: 2022-06-20
authors: Qi
tags: [K3s]
keywords:
  - K3s 调整节点驱逐阀值
---

修改 K3s Server 的驱逐阀值

<!-- truncate -->

* 编辑或者新建 `/etc/rancher/k3s/config.yaml`

```yaml
kubelet-arg
  - "eviction-hard=memory.available<500Mi,nodefs.available<5%"
```

保存并重启 K3s

通过 `kubectl describe node NODENAME` 查看是否生效



## 参考资料

`K3s 配置文件` 文档：https://docs.rancher.cn/docs/k3s/installation/install-options/_index#%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6

`K3s kubelet arg`文档：https://docs.rancher.cn/docs/k3s/installation/install-options/server-config/_index#kubernetes-%E8%BF%9B%E7%A8%8B%E5%AE%9A%E5%88%B6%E6%A0%87%E5%BF%97

K3s Github issue 参考：https://github.com/k3s-io/k3s/issues/5488

K8S 文档参考`节点压力驱逐`：https://kubernetes.io/zh-cn/docs/concepts/scheduling-eviction/node-pressure-eviction/