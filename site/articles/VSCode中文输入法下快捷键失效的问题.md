---
title: VS Code 中文输入法下快捷键失效的问题
created: '2020-03-13'
modified: '2020-03-13'
tags: [Tech/Tools]
---

使用 `VS Code` 经常会使用 `Ctrl + '` 来打开终端，但是发现在中文输入法下，这个快捷键会失效，同时 `VS Code`的空白页上`Toggle Terminal` 后的快捷键也显示为空。

通过 Google，找到了原因。

[microsoft/vscode](https://github.com/microsoft/vscode/wiki/Keybinding-Issues#troubleshoot-mac-keybindings)

这里摘要了重点部分。

> Are you using a custom installed keyboard layout with its own sub-layouts?
> **symptoms**: changing the sub-layout to Dvorak - QWERTY ⌘ in the custom Chinese pinyin layout is not reflected in VS Code
> **solution**: use “keyboard.dispatch”: “keyCode” in your settings and restart VS Code.
> **explanation**: using custom keyboard layouts with their own sub-layouts cannot be detected by VS Code because the keyboard layout reports the same identifier when the sub-layout is changed.

解决方法就是，进入 `VS Code` 的 `settings` ，将 `keyboard.dispatch` 设置为 `keyCode` 。

现在无论在何种输入法下，快捷键们都不会再失效了。
