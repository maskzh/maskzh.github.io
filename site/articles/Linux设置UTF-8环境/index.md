---
title: Linux 设置 UTF-8 环境
created: '2020-07-23'
modified: '2020-07-23'
tags: [Tech/Linux]
---

[原文链接](https://perlgeek.de/en/article/set-up-a-clean-utf8-environment)

Linux 下经常会有无法显示中文，无法显示非 ASCII 字符等情况。将系统的语言编码设置为 UTF-8 可以解决这些语言和显示的问题。

### Locales: 安装

```bash
$ dpkg -l locales
Desired=Unknown/Install/Remove/Purge/Hold
| Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend
|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)
||/ Name           Version       Architecture Description
+++-==============-=============-============-========================================================
ii  locales        2.31-0ubuntu9 all          GNU C Library: National Language (locale) data [support]

```

看最后一行，如果它的开头是`ii`，说明`locales`已经安装。如果不是，你需要在 `root` 权限下安装`locales`。

```bash
aptitude install locales
```

### Locales: 生成

```bash
dpkg-reconfigure locales
```

此时会展示一个界面，列出了所有的 `locales` 项目。
通过按上下方向键，找到`en_US-UTF-8`，按空格选中它，然后按左右方向键激活下一步，回车即可。
`en_US-UTF-8`是最常使用的语言编码，如果你想直接使用中文，也可以选择`zh_CN-UTF-8`，其他语言则自行选择，只要是`UTF-8`就行。

### Locales：配置

根据你上一步选择的语言编码。将以下的环境变量添加到 shell 设置中。

```bash
export LC_ALL=en_US.UTF-8
export LANG=en_US.UTF-8
export LANGUAGE=en_US.UTF-8
```

如果是 `bash`，添加到`.bashrc`，如果是`zsh`，添加到`.zshrc`中。
然后执行`source ~/.bashrc`，Shell 现在已经能正常显示中文和非 ASCII 的字符了。你可能还需要重启机器或程序，才能让改动完全生效。

### Locales：确认

输入`locale`，你会看到输出。

```
LANG=en_US.UTF-8
LANGUAGE=en_US.UTF-8
LC_CTYPE="en_US.UTF-8"
LC_NUMERIC="en_US.UTF-8"
LC_TIME="en_US.UTF-8"
LC_COLLATE="en_US.UTF-8"
LC_MONETARY="en_US.UTF-8"
LC_MESSAGES="en_US.UTF-8"
LC_PAPER="en_US.UTF-8"
LC_NAME="en_US.UTF-8"
LC_ADDRESS="en_US.UTF-8"
LC_TELEPHONE="en_US.UTF-8"
LC_MEASUREMENT="en_US.UTF-8"
LC_IDENTIFICATION="en_US.UTF-8"
LC_ALL=en_US.UTF-8
```

至此就完成了语言编码的设置了。
