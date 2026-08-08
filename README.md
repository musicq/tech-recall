# Tech Recall

这是一个用于**快速恢复技术记忆**的个人知识库。

它不追求完整覆盖，也不替代官方文档。每篇笔记只保留：这个概念解决什么问题、核心原理是什么、最小实现如何工作，以及最容易忘记的边界。目标是几分钟内看完，并重新建立正确的 mental model。

## 使用方式

和 ChatGPT、Codex 或其他 AI 讨论完一个技术主题后，可以直接说：

> 把刚才关于 `<主题>` 的内容整理到 `musicq/tech-recall`。先阅读根目录的 `AGENTS.md`，有相关笔记就更新，没有再新建；保持简短，并更新 README 索引。

更具体的版本：

> 请把这段讨论沉淀到 `musicq/tech-recall`。不要复制聊天记录，而是提炼成一篇快速回忆笔记。重点写问题、核心原理和最小例子；“常用场景”和“相关方案”只有确实帮助理解或选择时才写。

## 笔记索引

### Data Streaming

- [JSON stream：如何边接收边解析 JSON](notes/data-streaming/json-stream.md)

### Package Management

- [pnpm 的 content-addressable store](notes/package-management/pnpm-content-addressable-store.md)

## 核心原则

- 一篇只回答一个核心问题。
- 先讲结论和机制，再补必要背景。
- 默认 400–1,000 个中文字，不计算代码、图和来源。
- 常用场景最多 3 条；相关方案只解释选择边界，不罗列生态。
- 图只用于解释数据流、结构或状态变化，优先使用 Mermaid。
- 实现细节优先引用官方文档、标准或源码，并注明版本差异。
- 已有相近笔记时优先更新或链接，不重复创建。

写作规范见 [CONTRIBUTING.md](CONTRIBUTING.md)，AI 操作流程见 [AGENTS.md](AGENTS.md)。
