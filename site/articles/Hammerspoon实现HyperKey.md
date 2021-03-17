---
title: Hammerspoon 实现 HyperKey
created: '2020-11-19'
modified: '2020-11-19'
tags: [Tech/Tools]
---

一直在使用 [Karabiner-Elements](https://karabiner-elements.pqrs.org/) 的 HyperKey 的功能（将 cmd + option + control + shirft 绑定到 caplock）。

但更新到 `Big sur` 后发现 HyperKey 不能用。而且到目前为止也没有等到更新，于是开始寻找替代方案。

最终选择 [Hammerspoon](https://www.hammerspoon.org/) + [hidutil](https://developer.apple.com/library/archive/technotes/tn2450/_index.html) 。通过 Hammerspoon 实现快捷键的绑定，然后使用 hidutil 将 `caplock` 改为 HyperKey。

Hammerspoon 的安装见 [Getting Started with Hammerspoon](https://www.hammerspoon.org/go/)。

```bash
brew install --cask hammerspoon
```

建立 Hammerspoon 的配置文件。

```bash
mkdir -p ~/.hammerspoon
cd ~/.hammerspoon
curl -O https://github.com/evantravers/hammerspoon-config/blob/38a7d8c0ad2190d1563d681725628e4399dcbe6c/hyper.lua
touch init.lua
```

HyperKey 的实现参考了 [evantravers/hammerspoon-config/hyper.lua](https://github.com/evantravers/hammerspoon-config/blob/38a7d8c0ad2190d1563d681725628e4399dcbe6c/hyper.lua)。

这里使用 `F19` 作为 HyperKey，同时也支持将 `F19` 映射为 `cmd + alt + shift + ctrl`。大多数软件的快捷键绑定中是无法直接 `F19` 的，所以你可以使用 `cmd + alt + shift + ctrl` 来替代。

编写 `init.lua`。

```lua
hyper = require('hyper')

hyper.start({
  ['com.google.chrome'] = {
    bundleID = 'com.google.chrome',
    hyper_key = 'c',
  },
  ['com.ripperhe.Bob'] = {
    bundleID = 'com.ripperhe.Bob',
    local_bindings = {'d'}
  },
})

hyper:bind({'shift'}, 'r', nil, function()
  hs.reload()
end)
```

如上的代码可以实现：

1. 通过 `F19 + c`，启动 Chrome。
2. 通过 `cmd + alt + shift + ctrl + d`，启动 Bob 的划词翻译。
3. 通过 `F19 + shift + r`，刷新 Hammerspoon 的配置。

使用 hidutil 将 `caplock` 改为 `F19`。

```bash
hidutil property --set '{"UserKeyMapping":[{"HIDKeyboardModifierMappingSrc":0x700000039,"HIDKeyboardModifierMappingDst":0x70000006E}]}'
```

到此就实现了 `caplock` 作为 HyperKey 了。

由于 Mac 重启后，hidutil 的改键会失效，所以还需要将 hidutil 的改键的代码写成 shell 脚本，并设置为可执行，然后通过「设置 - 用户和用户组 - 登录项」将脚本添加进来。

也可以在 `~/Library/LaunchAgents` 中增加一个 `plist`，作为开机即执行的 `service`。

```plist
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>Label</key>
    <string>com.example.startup</string>
    <key>ProgramArguments</key>
    <array>
      <string>zsh</string>
      <string>-c</string>
      <string>/Users/abc/startup.sh</string>
    </array>
    <key>RunAtLoad</key>
    <true/>
  </dict>
</plist>
```

参考：

- [Hammerspoon: A Better, Better Hyper Key](http://evantravers.com/articles/2020/06/08/hammerspoon-a-better-better-hyper-key/)
