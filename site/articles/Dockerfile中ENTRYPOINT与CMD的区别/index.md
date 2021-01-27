---
title: Dockerfile 中 ENTRYPOINT 与 CMD 的区别
created: '2020-07-22'
modified: '2020-07-22'
tags: [Tech/Docker]
---

两条指令的区别是指定的命令是否在 shell 中被调用。

1. `ENTRYPOINT ["node", "app.js"]`，exec 形式
2. `ENTRYPOINT node app.js`，shell 形式

如果使用 exec 形式的 ENTRYPOINT 指令：

```docker
ENTRYPOINT ["node", "app.js"]
```

可以从容器中的运行进程列表看出：这里是直接运行 node 进程，而并非在 shell 中执行。

```
$ docker exec 4675d ps x
	PID TTY     STAT TIME COMMAND
	1   ?       Ssl  0:00 node app.js
	2   ?       Rs   0:00 ps x
```

如果采用 shell 形式的指令：

```docker
ENTRYPOINT node app.js
```

则进程列表是这样：

```
$ docker exec 4675d ps x
	PID TTY     STAT TIME COMMAND
	1   ?       Ss   0:00 /bin/sh -c node app.js
	7   ?       Sl   0:00 node app.js
	13  ?       Rs+  0:00 ps x
```

可以看出，主进程（PID 1）是 shell 进程而非 node 进程。

**总结：shell 进程往往是多余的，因此通常使用 exec 形式的 ENTRYPOINT 指令。**
