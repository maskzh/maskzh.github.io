---
title: Mac 安装 aria2 以及开机自启
created: '2020-03-28'
modified: '2020-03-28'
tags: [Tech/Mac]
---

首先要安装 [Homebrew](https://brew.sh/) 。

1、安装 aria2

```
brew install aria2
```

2、配置 aria2

```
# 创建一个文件夹，用来放置 aria2 相关的文件
mkdir -p ~/.aria2

cd ~/.aria2

# 创建配置文件
touch aria2.conf
```

建议的配置文件如下：

```
# 文件保存路径, 默认为当前启动位置
dir=/Users/xxx/Downloads

### RPC相关设置 ##

# 允许rpc
enable-rpc=true

# 允许所有来源, web界面跨域权限需要
rpc-allow-origin-all=true

# 允许外部访问，false的话只监听本地端口
rpc-listen-all=false

# RPC端口, 仅当默认端口被占用时修改
# rpc-listen-port=6800

# 事件轮询方式, 取值:[epoll, kqueue, port, poll, select], 不同系统默认值不同
event-poll=kqueue

# 用户名
# rpc-user=user

# 密码
# rpc-passwd=passwd

# 上面的认证方式不建议使用,建议使用下面的token方式

# 设置加密的密钥
# rpc-secret=token

# 是否启用 RPC 服务的 SSL/TLS 加密,
# 启用加密后 RPC 服务需要使用 https 或者 wss 协议连接
# rpc-secure=true

# 在 RPC 服务中启用 SSL/TLS 加密时的证书文件,
# 使用 PEM 格式时，您必须通过 --rpc-private-key 指定私钥
# rpc-certificate=/path/to/certificate.pem

# 在 RPC 服务中启用 SSL/TLS 加密时的私钥文件
# rpc-private-key=/path/to/certificate.key

### 进度保存相关 ##

# 从会话文件中读取下载任务
# 开启该参数后 aria2 将只接受 session 中的任务, 这意味着 aria2 一旦使用 conf 后将不再接受来自终端的任务, 所以该条只需要在启动rpc时加上就可以了，引用自 <https://github.com/fsaimon/aria2.conf/blob/c4ff2f297b13e54e16952f83c423b0f1e656600c/aria2.conf#L37>
input-file=/Users/xxx/.aria2/aria2.session

# 在Aria2退出时保存`错误/未完成`的下载任务到会话文件
save-session=/Users/xxx/.aria2/aria2.session

# 定时保存会话, 0为退出时才保存, 需1.16.1以上版本, 默认:0
save-session-interval=0

### 下载连接相关 ##

# 最大同时下载数(任务数), 路由建议值: 3
max-concurrent-downloads=5

# 同服务器连接数
max-connection-per-server=16

# 断点续传
continue=true

# 最小文件分片大小, 下载线程数上限取决于能分出多少片, 对于小文件重要
min-split-size=10M

# 单文件最大线程数, 路由建议值: 5
split=16

# 下载速度限制, 运行时可修改, 默认:0
# max-overall-download-limit=0

# 上传速度限制, 运行时可修改, 默认:0
# max-overall-upload-limit=0

# 单文件速度限制, 默认:0
# max-download-limit=0

# 单文件速度限制
max-upload-limit=0

# 断开速度过慢的连接
lowest-speed-limit=0

# 禁用IPv6, 默认:false
# disable-ipv6=true

# 当服务器返回503错误时, aria2会尝试重连
# 尝试重连次数, 0代表无限, 默认:5
max-tries=0

# 重连冷却, 默认:0
# retry-wait=0

# 验证用，需要1.16.1之后的release版本
# referer=*

# 文件缓存, 使用内置的文件缓存, 如果你不相信Linux内核文件缓存和磁盘内置缓存时使用, 需要1.16及以上版本
# disk-cache=0

# 另一种Linux文件缓存方式, 使用前确保您使用的内核支持此选项, 需要1.15及以上版本(?)
# enable-mmap=true

# 文件预分配, 能有效降低文件碎片, 提高磁盘性能. 缺点是预分配时间较长
# 所需时间 none < falloc ? trunc << prealloc, falloc和trunc需要文件系统和内核支持
file-allocation=prealloc

### BT/PT下载相关 ##

# 当下载的是一个种子(以.torrent结尾)时, 自动开始BT任务, 默认:true
# follow-torrent=true

# BT监听端口, 当端口被屏蔽时使用, 默认:6881-6999
# listen-port=51413

# 单个种子最大连接数, 默认:55
# bt-max-peers=55

# 打开DHT功能, PT需要禁用, 默认:true
# enable-dht=true

# 打开IPv6 DHT功能, PT需要禁用
# enable-dht6=false

# DHT网络监听端口, 默认:6881-6999
# dht-listen-port=6881-6999

# 本地节点查找, PT需要禁用, 默认:false
bt-enable-lpd=true

# 种子交换, PT需要禁用, 默认:true
# enable-peer-exchange=true

# 每个种子限速, 对少种的PT很有用, 默认:50K
# bt-request-peer-speed-limit=50K

# 客户端伪装, PT需要
# peer-id-prefix=-TR2770-
user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36

# 当种子的分享率达到这个数时, 自动停止做种, 0为一直做种, 默认:1.0
# seed-ratio=1.0

# 作种时间大于30分钟，则停止作种
seed-time=30

# 强制保存会话, 话即使任务已经完成, 默认:false
# 较新的版本开启后会在任务完成后依然保留.aria2文件
# force-save=false

# BT校验相关, 默认:true
# bt-hash-check-seed=true

# 继续之前的BT任务时, 无需再次校验, 默认:false
bt-seed-unverified=true

# 保存磁力链接元数据为种子文件(.torrent文件), 默认:false
bt-save-metadata=true

# 强制加密, 防迅雷必备
# bt-require-crypto=true

# 下载完成后删除 .aria2 的同名文件
# on-download-complete=/Users/zyc/.aria2/delete_aria2
```

3、开机自启

新增一个文件`/usr/local/opt/aria2/homebrew.mxcl.aria2.plist`，`/usr/local/opt/aria2`是`brew`安装`aria2`的目录，放下该目录下，`brew`就会将它识别出来。文件内容如下

```
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "<http://www.apple.com/DTDs/PropertyList-1.0.dtd>">
<plist version="1.0">
  <dict>
    <key>Label</key>
    <string>homebrew.mxcl.aria2</string>
    <key>ProgramArguments</key>
    <array>
      <string>/usr/local/bin/aria2c</string>
      <string>--conf-path=/Users/xxx/.aria2/aria2.conf</string>
    </array>
    <key>KeepAlive</key>
    <dict>
      <key>Crashed</key>
      <true/>
      <key>SuccessfulExit</key>
      <false/>
    </dict>
    <key>ProcessType</key>
    <string>Background</string>
    <key>StandardErrorPath</key>
    <string>/usr/local/var/log/aria2.log</string>
    <key>StandardOutPath</key>
    <string>/usr/local/var/log/aria2.log</string>
  </dict>
</plist>
```

使用 `brew services` 来管理它。

```
brew services start aria2
```

现在 `aria2`可以开机自启了。你可以 `brew services list` 查看它的运行状态。

```
Name      Status  User Plist
aria2     started xxx  /Users/xxx/Library/LaunchAgents/homebrew.mxcl.aria2.plist
```

4、如何使用？

按照上面的配置，现在可以通过 RPC `http://localhost:6800/jsonrpc`来管理你的下载了。
ps：因为使用 RPC 的方式，所以 `aria2` 不会接受来自终端的任务了。

通过可视化的界面，可以让 `aria2` 更好地被使用。推荐的工具：

- [AriaNg](https://github.com/mayswind/AriaNg) Web UI，通过可视化 UI 方便地管理下载。
- [YAAW](https://chrome.google.com/webstore/detail/yaaw-for-chrome/dennnbdlpgjgbcjfgaohdahloollfgoc) Chrome 插件，可以方便地导出任务到 `aria2` 中，也自带一个 Web UI。

**如果不想经历上面这么多的步骤，你也可以直接使用[Motrix](https://motrix.app/)🤐。**[Motrix](https://motrix.app/)是一个 Mac 客户端，集成了 `aria2`和简单友好的界面。强烈推荐 👍。但因为是基于 `electron`，启动速度有一点点慢。而且每次需要下载时，都要先将它启动。当然也可以设置让软件开机启动常驻后台。
