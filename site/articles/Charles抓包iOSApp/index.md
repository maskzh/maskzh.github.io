---
title: Charles 抓包 iOS App
created: '2020-07-19'
modified: '2020-07-19'
tags: [Tech/Charles]
---

1. 将 iOS 设备和你电脑连接到同一个 Wi-Fi 下。
2. 进入 iOS 设置的 WLAN 设置，点击当前 Wi-Fi 后面的 ℹ️，找到 HTTP PROXY 下的 Configure Proxy，改为手动，填上电脑当前的局域网 IP （例如：192.168.1.2），端口号默认为 8888。（你可以在 Charles - Proxy - Proxy Settings 找到相关设置）。
3. 点击 Start Recording，这时你就可以看到 iOS 设备上的请求了。

HTTP 的请求你可以看到请求的内容，但 HTTPS 的请求你只能看到 unknown。iOS App 现在默认都是强制 HTTPS 访问的，因此还需要 SSL Proxying。

1. 找到 Charles - Help - SSL Proxying - Install Charles Root Certificate on a Mobile Device or Remote Browser。
   按弹框的提示，需要你在手机端打开 [chls.pro/ssl](http://chls.pro/ssl) 下载证书，并在手机上激活证书。
   在 iOS 13 以上的系统，你需要在 Settings - General - Profiles 中安装证书，然后还需要在 Settings - General - About - Certificate Trust Settings 激活证书。
2. 找到 Charles - Help - SSL Proxying - Save Charles Root Certificate。
   保存一份证书到电脑上，待用。
3. 找到 Charles - Proxy - SSL Proxying Settings ，点击 Root Certificate 选项卡，点击 Import 导入对应扩展名的证书。
4. 点击 Start Recording，HTTPS 的请求还是 unknown。右击该请求，点击 Enable SSL Proxying。
5. 完成，你可以查看该 HTTPS 请求的内容了。如果需要查看其他的请求，请重复步骤 4。
