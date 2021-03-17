---
title: envsubst 使用指南
created: '2021-01-25'
modified: '2021-01-25'
tags: [Tech/DevOps]
---

一个小程序 `envsubst`，可以简洁地将环境变量注入到文件中。

举个例子：我想把 CI 的 `BUILD_NUMBER` 注入到 `k8s` 的部署文件 `deployment.yaml` 中。

文件本身是不支持动态变量的，所有的东西都是写死的。想要注入变量，那可以试试 `envsubst`。

在 `deployment.yaml` 中通过 `${VAR}` 来注入变量。

```
# 截取部分的配置文件
env:
  - name: DRONE_BUILD_NUMBER
    value: '${DRONE_BUILD_NUMBER}'
```

然后通过 `envsubst`，就可以将变量注入文件中。

```bash
export DRONE_BUILD_NUMBER=${DRONE_BUILD_NUMBER}
envsubst < deployment.yaml | kubectl apply -f -
```

`envsubst` 使用非常简单，而且 Linux 系统中通常也自带这个小程序，不需要额外安装。

参考：

- [Invoking the envsubst program](https://www.gnu.org/software/gettext/manual/html_node/envsubst-Invocation.html)
