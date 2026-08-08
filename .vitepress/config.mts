import { readdirSync, readFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, type DefaultTheme } from 'vitepress'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const notesDir = join(root, 'notes')

const categoryNames: Record<string, string> = {
  'data-streaming': 'Data Streaming',
  'package-management': 'Package Management',
}

function humanize(value: string) {
  return value
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

function noteTitle(path: string) {
  const content = readFileSync(path, 'utf8')
  return content.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? humanize(path)
}

function createSidebar(): DefaultTheme.SidebarItem[] {
  return readdirSync(notesDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((category) => {
      const categoryDir = join(notesDir, category.name)
      const items = readdirSync(categoryDir, { withFileTypes: true })
        .filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((entry) => ({
          text: noteTitle(join(categoryDir, entry.name)),
          link: `/notes/${category.name}/${entry.name.slice(0, -3)}`,
        }))

      return {
        text: categoryNames[category.name] ?? humanize(category.name),
        collapsed: false,
        items,
      }
    })
    .filter((group) => group.items.length > 0)
}

export default defineConfig({
  lang: 'zh-CN',
  title: 'Tech Recall',
  description: '短、准、够用的技术记忆库。',
  cleanUrls: true,
  lastUpdated: true,
  srcExclude: [
    'README.md',
    'AGENTS.md',
    'CONTRIBUTING.md',
    'templates/**/*.md',
  ],
  themeConfig: {
    nav: [
      { text: '笔记', link: '/notes/data-streaming/json-stream' },
      { text: 'GitHub', link: 'https://github.com/musicq/tech-recall' },
    ],
    sidebar: createSidebar(),
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜索',
                buttonAriaLabel: '搜索',
              },
              modal: {
                displayDetails: '显示详细列表',
                resetButtonTitle: '重置搜索',
                backButtonTitle: '关闭搜索',
                noResultsText: '没有找到相关内容',
                footer: {
                  selectText: '选择',
                  selectKeyAriaLabel: '回车',
                  navigateText: '导航',
                  navigateUpKeyAriaLabel: '上箭头',
                  navigateDownKeyAriaLabel: '下箭头',
                  closeText: '关闭',
                  closeKeyAriaLabel: 'Esc',
                },
              },
            },
          },
        },
      },
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/musicq/tech-recall' },
    ],
    editLink: {
      pattern: 'https://github.com/musicq/tech-recall/edit/main/:path',
      text: '在 GitHub 编辑',
    },
    outline: {
      level: [2, 3],
      label: '本页内容',
    },
    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },
    lastUpdated: {
      text: '最后更新',
      formatOptions: {
        dateStyle: 'medium',
        timeStyle: 'short',
      },
    },
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '返回顶部',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
  },
})
