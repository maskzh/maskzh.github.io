---
title: Linux 设置时区（含构建镜像时设置时区）
created: '2020-07-25'
modified: '2020-07-25'
tags: [Tech/Linux]
---

CentOS 和 Ubuntu 的时区是 `/etc/localtime`。可以通过`ll /etc/localtime`来查看。

```
lrwxrwxrwx 1 root root 33 May 18 14:40 /etc/localtime -> /usr/share/zoneinfo/Asia/Shanghai
```

之前都是通过

```bash
cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
```

来修改系统时区。

但 CentOS 7 之后，`/etc/localtime` 文件变成了一个链接，所以直接使用`cp`可能会导致错误。

现在修改系统时区最好的方法就是使用`timedatectl`。

```bash
timedatectl list-timezones | grep Shanghai # 查找完整名称
timedatectl set-timezone Asia/Shanghai # 设置时区
```

主机上可以通过上述方法来修改，容器该如果修改呢？

Debian 系的系统内置了`tzdata`。在 `Dockerfile` 中声明`TZ`环境变量即可。

```docker
ENV TZ=Asia/Shanghai
```

Alpine 系的系统没有内置`tzdata`，所以还需要安装`tzdata`。

```docker
ENV TZ=Asia/Shanghai

RUN apk update \\
    && apk add tzdata \\
    && echo "${TZ}" > /etc/timezone \\
    && ln -sf /usr/share/zoneinfo/${TZ} /etc/localtime \\
    && rm /var/cache/apk/*
```
