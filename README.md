# dsh-cyber-vape

给你的 DSH 加一根电子烟。

模型思考的时候，思考正文左边会立着一根电子烟——**烟头亮起、一明一暗地呼吸，三个烟圈错开往上飘**。思考一结束，烟头暗下去，烟圈消失，杆子留着。

**它没有任何功能。**

不记录、不统计、不联网、不发请求、不拦鼠标（`pointer-events: none`）。你不能点它、拖它、设置它。它唯一做的事，是把"我知道它正在想"这件事画出来。

## 安装

```bash
dsh plugin --profile desktop add github:<你的用户名>/dsh-cyber-vape
```

装完**重启一次 dsh**（插件在 bundle 层组装，不重启不生效）。

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
