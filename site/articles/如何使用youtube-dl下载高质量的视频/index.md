---
title: 如何使用 youtube-dl 下载高质量的视频
created: '2020-03-31'
modified: '2020-03-31'
tags: [Tech/Tools]
---

如下的命令，可以列出视频支持下载的格式：

```bash
youtube-dl -F url
```

通常会有一个`best`标签，它包含了视频和音频，但往往质量和清晰度不够高。而质量和清晰度高的格式，视频和音频是分离的。

因此需要通过`ffmpeg`来将视频和音频合成在一起，以获取最终高质量的视频。

需要安装`ffmpeg`。

```bash
apt install ffmpeg # ubuntu
brew install ffmpeg # mac
```

然后执行

```bash
youtube-dl -f bestvideo+bestaudio url
```

`youtube-dl` 会下载视频和音频，并通过 `ffmpeg` 将它们合成在一个文件中。Enjoy！
