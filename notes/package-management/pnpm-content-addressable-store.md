# pnpm 的 content-addressable store

> 一句话回忆：pnpm 按**文件内容的 hash** 保存依赖，相同内容在机器上只存一次；安装时把文件导入项目的 virtual store，再用 symlink 拼出依赖图。

**Tags:** `pnpm`, `package-manager`, `content-addressable-storage`, `node_modules`

> 版本说明：核心 mental model 基于 pnpm 11/12 文档，检查于 2026-08-08；具体导入方式取决于配置和文件系统。

## 它解决什么问题

传统安装方式中，100 个项目使用同一份依赖，项目目录里通常会出现很多重复文件。Content-addressable storage（CAS）不以包名或版本作为唯一身份，而以内容 hash 定位文件：

```text
key = hash(file bytes)
```

内容相同就复用同一份；新版本若只改了一个文件，store 只需新增发生变化的内容，而不是再保存完整副本。

## 核心原理

pnpm 默认的 `nodeLinker: isolated` 可以理解为三层：

1. **Global content-addressable store**：跨项目共享，保存按内容寻址的文件。
2. **Project virtual store**：通常是 `node_modules/.pnpm`，保存当前项目需要的 package instances。
3. **Dependency links**：symlink 把 package instances 连接成依赖图，并把直接依赖暴露到根 `node_modules`。

```mermaid
flowchart LR
  A[registry tarball] --> B[global CAS]
  B -->|clone / hardlink / copy| C[node_modules/.pnpm]
  C -->|symlinks form graph| D[root node_modules]
```

`packageImportMethod: auto` 会优先尝试 clone/reflink；不支持时尝试 hard link，再不行才 copy。**文件如何从 store 导入项目**和**依赖之间如何用 symlink 连接**是两件不同的事。

## 一个最小目录结构

假设项目直接依赖 `foo`，而 `foo` 依赖 `bar`：

```text
node_modules/
├── foo -> .pnpm/foo@1.0.0/node_modules/foo
└── .pnpm/
    ├── foo@1.0.0/node_modules/
    │   ├── foo/       # 文件来自 CAS
    │   └── bar -> ../../bar@1.0.0/node_modules/bar
    └── bar@1.0.0/node_modules/bar/
```

根目录只链接项目声明的直接依赖；传递依赖在 `.pnpm` 内按真实依赖关系连接。这样既能复用文件，也减少代码意外访问未声明依赖的机会。

## 常用场景

- 本机有很多 Node.js 项目，依赖版本大量重叠。
- monorepo 中多个 workspace 反复安装相同 packages。
- 切换分支或重复安装时，尽量复用已经进入 store 的内容。

## 和相关方案怎么选

| 方案 | 核心区别 | 什么时候选 |
| --- | --- | --- |
| npm / Yarn Classic | 通常创建 hoisted `node_modules`，项目间文件复用较少 | 最看重传统工具兼容性 |
| pnpm `nodeLinker: hoisted` | 仍使用 pnpm 的获取与 store，但生成更扁平的目录 | 工具不兼容 symlink layout |
| Yarn Plug'n'Play | 不创建传统 `node_modules`，通过映射解析依赖 | 能接受更彻底的解析模型和适配成本 |

## 容易混淆

- Global CAS 不等于项目里的 `node_modules/.pnpm`；前者跨项目共享，后者默认属于当前项目。
- 不是“所有东西都是 symlink”：package 文件由 clone、hard link 或 copy 导入，symlink 主要用于构建依赖关系。
- CAS 的 key 来自内容，不是 `react@19.0.0` 这样的包坐标；包名和版本用于解析，内容 hash 用于去重与完整性识别。

## Sources

- [pnpm Motivation: saving disk space](https://pnpm.io/motivation)
- [pnpm symlinked `node_modules` structure](https://pnpm.io/symlinked-node-modules-structure)
- [pnpm Node-Modules settings](https://pnpm.io/settings/node-modules)
- [`pnpm store` commands](https://pnpm.io/cli/store)
