# CAS 为什么按 hash 前缀分目录

> 一句话回忆：`files/ab/cdef...` 是 directory fan-out：用 hash 前两位把对象均匀分到 256 个小目录，以少量路径 lookup 换掉一个超大平铺目录。

**Tags:** `content-addressable-storage`, `filesystem`, `directory-sharding`, `fan-out`, `pnpm`

> 版本说明：pnpm 11 的目录实现与 Linux VFS path lookup 检查于 2026-08-08；其他文件系统的缓存和索引细节可能不同。

## 它解决什么问题

CAS 可能积累几十万甚至更多对象。全部平铺到一个目录并非一定不可用，但会让单个目录的 metadata、缓存、`readdir`、备份和删除操作变重。Hash 输出近似均匀，因此可以直接拿前缀做 shard key，不需要额外索引表。

## 核心原理

pnpm 11 的 CAFS 会把 SHA-512 digest 拆成：

```text
digest = abcd1234...
path   = files/ab/cd1234...
```

两个十六进制字符有 `16² = 256` 种组合。100 万个对象平均约为每个目录 3,906 个 entry。前缀取几位是工程折中：位数越多，每个目录越小，但目录总数和层级也越多。

这里的 **fan-out** 是“一个节点向下分出多少个子节点”；256 个 prefix directory 就是 256-way fan-out。**fan-in** 则是多个上游汇聚到一个节点，例如多个 worker 的结果进入 aggregator。

## 读取会不会产生很多次 I/O

应用只需一次调用：

```ts
await readFile(`store/files/${hash.slice(0, 2)}/${hash.slice(2)}`)
```

它不必逐层 `exists()`。内核会解析每个 path component；以 Linux 为例，dentry cache 可以让很多 lookup 在内存中完成，cache miss 才需要向具体文件系统查询。因此“路径多两层”意味着更多 lookup，但不等于固定增加两次磁盘 I/O。

这是几次小目录 lookup 与一次超大目录 lookup 的取舍。提前逐层检查是否存在反而会增加 syscall；直接读取并处理 `ENOENT` 通常更合适。

## 容易混淆

- Directory sharding 是 CAS 的磁盘布局策略，不是 content addressing 的定义；CAS 的关键仍是 `key = hash(content)`。
- Hash 前两位不是特殊规则，只是常见的 fan-out 大小。
- 路径层级增加的是 path resolution 工作，不等于每层都发生物理磁盘访问。

## Sources

- [pnpm CAFS path layout (`getFilePathInCafs.ts`)](https://github.com/pnpm/pnpm/blob/6b6205b527a7e3743d52bc9c10e1213fd0b6b9bc/pnpm11/store/cafs/src/getFilePathInCafs.ts)
- [pnpm CAFS hashing (`index.ts`)](https://github.com/pnpm/pnpm/blob/6b6205b527a7e3743d52bc9c10e1213fd0b6b9bc/pnpm11/store/cafs/src/index.ts)
- [Linux kernel pathname lookup](https://github.com/torvalds/linux/blob/master/Documentation/filesystems/path-lookup.rst)
