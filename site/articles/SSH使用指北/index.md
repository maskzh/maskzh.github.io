---
title: SSH 使用指北
created: '2020-07-19'
modified: '2020-07-19'
tags: [Tech/SSH]
---

### 使用密钥对登录

通过 `ssh` 登录 VPS 的方式，就两种方式，密码或者密钥。通常我们都会关闭密码登录，因为不够安全，而且经常要输入密码，麻烦。相反，使用密钥，则更便捷也更安全。

是时候使用 `Ed25519` 算法来生成密钥对了，相对 `RSA` 更短、更安全且加密解密速度也更快。

```bash
ssh-keygen -o -a 100 -t ed25519 -f ~/.ssh/id_ed25519 -C "name@example.com"
```

然后将密钥添加到 SSH Agent。

```bash
ssh-add ~/.ssh/id_ed25519
```

将公钥`id_ed25519.pub` 的内容填入 VPS 的 `~/.ssh/authorized_keys` 文件，然后不需要密码你就可以 `ssh` 上你的 VPS 了。

推荐一个小工具 `ssh-copy-id`，Mac 上可以通过 `brew install ssh-copy-id` 来安装。它的使用方式和 `ssh` 一样。它会将公钥自动填入 VPS 的`~/.ssh/authorized_keys` 文件中。你只需要通过 `ssh-copy-id` 登录一次 VPS，下一次你就不需要再输入密码了。

### 使用 ssh config 文件

登录 VPS 免不了要输入 `ssh user@12.34.56.78`，记不住 IP 是肯定的事。如果`@`后面使用域名的话还好，但我们有更好的别名定义的方式，例如这样 `ssh a`，就可以登录 VPS 了。

在你的电脑的 `~/.ssh` 下新建一个 `config` 文件。文件内容的格式如下。

```
Host *
  AddKeysToAgent yes
  UseKeychain yes
  IdentityFile ~/.ssh/id_ed25519

Host pi
  HostName raspberrypi.local
  User pi
```

现在可以通过 `ssh pi` 登录树莓派了。更多的配置项见[SSH config file for OpenSSH client](https://www.ssh.com/ssh/config/)

在 macOS Sierra 10.12.2 以及之后的版本，通过 ssh config 文件可以自动加载密钥，并且可以将它们存储在 Keychain 中。
