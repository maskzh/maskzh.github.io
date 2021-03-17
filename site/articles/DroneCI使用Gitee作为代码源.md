---
title: DroneCI 使用 Gitee 作为代码源
created: '2021-03-09'
modified: '2021-03-09'
tags: [Tech/DevOps]
---

DroneCI 当前还不支持 Gitee，自己实现又比较费时，但是可以通过自定义 clone 的 step 来实现。

思路是这样的，提交代码后，同时推送代码到 Github 和 Gitee，DroneCI 响应 Github 的 Webhook 开始工作，通过自定义 clone 行为，拉取 Gitee 的代码而不是 GitHub 的代码，进行后续的任务。

同步推送代码到多个代码仓库有多种方式，无感且不需要额外代码推荐下面这种方式。

```bash
git remote add origin git@gitee.com:org/repo.git
git remote set-url --add --push git@github.com:org/repo.git
```

通过`git remote -v`，会得到

```
origin	git@gitee.com:org/repo.git (fetch)
origin	git@gitee.com:org/repo.git (push)
origin	git@github.com:org/repo.git (push)
```

这样配置后，推送时就会同时（串行）推送到 Github 和 Gitee 了。

`.drone.yml`的样例参考：

```yaml
kind: pipeline
type: docker
name: publish

clone:
  disable: true # 这里将默认的 clone 行为 disable 掉

steps:
	# 自定义 clone 的 step
  - name: clone
    image: alpine/git
    commands:
      - export TMPFILE=$(mktemp) && echo "$GIT_CLONE_KEY" > $TMPFILE
      - git clone git@gitee.com:org/repo.git . --depth 1 --config core.sshCommand="ssh -i $TMPFILE -o StrictHostKeyChecking=no"
      - git checkout $DRONE_COMMIT
    environment:
      GIT_CLONE_KEY:
        from_secret: git_clone_key
```

`GIT_CLONE_KEY`通过在 DroneCI 的项目设置中的 Secrets 中添加。

需要注意的是：DroneCI 有 GitHub 的授权，但没有 Gitee 的授权。因此这里尝试解决了 Gitee 私有仓库的权限问题。

生成一组密钥对，将公钥配置到 Gitee 的部署公钥中，私钥则配置在 DroneCI Secrets。当然也可以通过用户名密码或 Token 来授权，但部署公钥是更好的选择，便于控制授权，且部署公钥仅能 clone 和 pull 代码。

`git clone`命令无法直接使用私钥 string，所以得将私钥 string 写入到文件中来使用，所以这里写得比较啰嗦，可能有更简单的用法。
