---
title: 终极 Shell - oh my zsh
created: '2020-07-21'
modified: '2020-07-21'
tags: [Tech/ZSH]
---

提升你使用 Shell 的体验和效率，让人爱上使用 Shell。

啥是 zsh 呢？[维基百科](https://zh.wikipedia.org/wiki/Z_shell)

> Z shell（Zsh）是一款可用作交互式登录的 shell 及脚本编写的命令解释器。Zsh 对 Bourne shell 做出了大量改进，同时加入了 Bash、ksh 及 tcsh 的某些功能。

除了 `zsh`，还需要搭配 `oh my zsh`，`Oh My Zsh`收集了 `zsh`的第三方插件及主题，也是更新插件及主题的工具。让你开箱即用。

### 安装 zsh

1. 根据你的系统，例如 ubuntu，`sudo apt install zsh`即可。
2. 验证安装是否成功，`zsh --version`，它会输出`zsh 5.4.2`类似的结果，说明已成功安装了 `zsh`。
3. 将 `zsh`设置为你的默认 Shell，`chsh -s $(which zsh)`，注意这里不要用 `sudo`，原因见[How to make ZSH the default shell?](https://askubuntu.com/questions/131823/how-to-make-zsh-the-default-shell)。
   更多的平台的安装见 [Installing ZSH](https://github.com/ohmyzsh/ohmyzsh/wiki/Installing-ZSH)

接下来安装 `oh my zsh`，安装`oh my zsh`时，会提示让你将 `zsh`设置为默认的 Shell，所以上面步骤 3 可以跳过。

### 安装 oh my zsh

安装`oh my zsh`，除了需要先 `zsh` 之外，还需要 `git`和`curl`，但这个一般系统都是自带的，如果提示不支持的命令，那么你需要`sudo apt install git curl`。

```
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

运行上述命令即可安装。

### 必备的主题和插件

1. [powerlevel10k](https://github.com/romkatv/powerlevel10k#oh-my-zsh)
   powerlevel10k 是一款 zsh 的主题，它强调速度、灵活性和开箱即用的体验。对比 `oh my zsh`自带的主题，启动速度提升非常明显，强烈安利。

```bash
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k
```

然后在`.zshrc`中设置 `ZSH_THEME="powerlevel10k/powerlevel10k"`。

2. z，自带
   `z`是 `oh my zsh`自带的插件，它可以记忆访问过的目录，例如你`cd /etc/ssl/certs`，那么下一次你直接可以通过`z certs`访问进入到`/etc/ssl/certs`。

3. [zsh-autosuggestions](https://github.com/zsh-users/zsh-autosuggestions)
   zsh-autosuggestions，会记忆你执行过的命令，当你输入之前执行的命令的前几个字符，它就能帮你补全完整的命令，如果它补全就是你想要的完整命令，你只需要按一下`→`即可。它会让你爱不释手，解放你的记忆，释放你的剪贴板。

详细的安装方法见[Install zsh-autosuggestions](https://github.com/zsh-users/zsh-autosuggestions/blob/master/INSTALL.md)

```bash
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
```

4.  [zsh-syntax-highlighting](https://github.com/zsh-users/zsh-syntax-highlighting)
    `zsh-syntax-highlighting` 通过对你们输入的命令语法解析和高亮，在你运行命令之前，就能提示你命令输入是否正确。能够减少很多不必要的错误。

详细的安装方法见[install zsh-syntax-highlighting](https://github.com/zsh-users/zsh-syntax-highlighting/blob/master/INSTALL.md)

```bash
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```

### zsh 配置

`zsh` 的配置文件在`~/.zshrc`。
安装完插件，你还需要启用它们。

找到`.zshrc`文件中的 `plugins`，然后加上你的插件。

```
plugins=(
  git
  z
  zsh-autosuggestions
  zsh-syntax-highlighting
)
```

保存文件后，你还需要`source .zshrc`❗️，来让配置文件生效。

如果你想改`zsh`的主题，找到`.zshrc`文件中的`ZSH_THEME`。默认支持的主题就有很多，你可以在[Themes](https://github.com/robbyrussell/oh-my-zsh/wiki/Themes)找到它们。默认的主题比较简洁，个人比较推荐`ys`。修改后同样需要`source .zshrc`。

Enjoy！

### 一键脚本

```bash
# 安装 oh-my-zsh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

# 安装 powerlevel10k
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k

# 安装 zsh-autosuggestions
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions

# 安装 zsh-syntax-highlighting
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting

# 更新 .zshrc
sed 's/ZSH_THEME="robbyrussell"/ZSH_THEME="powerlevel10k/powerlevel10k"/' < ~/.zshrc
sed 's/plugins=(git)/plugins=(git z zsh-autosuggestions zsh-syntax-highlighting httpie)/' < ~/.zshrc

# 使 .zshrc 生效
source ~/.zshrc
```
