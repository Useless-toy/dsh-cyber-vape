# dsh-cyber-vape

给你的 DSH 加一根电子烟。

模型思考的时候，思考正文左边会立着一根电子烟——**烟头亮起、一明一暗地呼吸，三个烟圈错开往上飘**。思考一结束，烟头暗下去，烟圈消失，杆子留着。

**它没有任何功能。**

不记录、不统计、不联网、不发请求、不拦鼠标（`pointer-events: none`）。你不能点它、拖它、设置它。它唯一做的事，是把"我知道它正在想"这件事画出来。

## 安装

```bash
dsh plugin --profile desktop add github:Useless-toy/dsh-cyber-vape
```

装完**重启一次 dsh**（插件在 bundle 层组装，不重启不生效）。

## 装不上怎么办

如果那条命令报下面任意一种错，**不是这个插件的问题，是你机器缺 git、或连不上 GitHub**：

```
ERR_PNPM_GIT_RESOLVE_FAILED
git ls-remote failed: 'git' 不是内部或外部命令
```

```
Failed to connect to github.com port 443 after 21000 ms
```

### 办法一：先装 git

pnpm 解析 `github:` 依赖时会调用 `git` 命令。装 [Git for Windows](https://git-scm.com/download/win)，**安装时勾上 "Add to PATH"**，然后重开一个终端，再跑一次安装命令。

> ⚠ **光装 GitHub Desktop 不行**——它自带的 git 藏在安装目录里，不会加进 PATH。

### 办法二：走镜像，手动装

1. **下载压缩包**（两个镜像任选，哪个通用哪个；镜像会失效，用之前先试）：
   ```
   https://gh-proxy.com/https://github.com/Useless-toy/dsh-cyber-vape/archive/refs/heads/main.tar.gz
   https://ghproxy.net/https://github.com/Useless-toy/dsh-cyber-vape/archive/refs/heads/main.tar.gz
   ```
2. **解压到一个长期保留的目录**。
   ⚠ 别放下载文件夹或临时目录——安装时用的是**软链接**，原目录一删，插件就断链失效。
3. **装这个目录**：
   ```bash
   dsh plugin --profile desktop add <解压出来的目录完整路径>
   ```
   或者进 **设置 → 插件**，选「从本地安装」，指向那个目录。

### 怎么确认装上了

重启 dsh，让模型思考一次——**思考正文左边应该立着一根烟**。

没有的话，先去 **设置 → 插件** 看有没有 `dsh-cyber-vape` 且处于启用状态；有但没显示，多半是没重启。

## 出问题怎么卸掉

⚠ **这一段比安装那一段重要。**

它占据的是 DSH 官方渲染"思考正文"的位置——**替换式，不是叠加**。万一它挂了，你会看到**思考内容整块空白**。那不是 DSH 坏了，是它坏了。

```bash
dsh plugin --profile desktop remove dsh-cyber-vape
```

或者进 **设置 → 插件**，把它关掉。

**官方渲染会自己顶回来**——它只是被压低优先级，没有被删掉。重载页面即可恢复。

## 已知限制

- 只适用于 **web / 桌面版 DSH**（client 侧插件）
- 挂在 `conversation.chat.reasoning.body`，`priority: 50`，顶掉官方的 `priority: 100`
- 思考正文改用 `pre-wrap` 纯文本渲染，**代码块的排版会比官方朴素**
- 装在 profile 上，**同一 profile 的所有会话共享它**
- 烟圈是 CSS 动画，不是 canvas，**低端机会有轻微掉帧**

## 兼容

- `dsh >= 0.1.7-rc.1`
- 不需要 Python、不需要额外依赖，**零安装成本**

## License

MIT
