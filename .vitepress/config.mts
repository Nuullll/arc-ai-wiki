import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Arc AI wiki",
  description: "Intel 显卡 AI 知识手册",
  locales: {
    root: {
      label: '中文',
      lang: 'zh-CN'
    }
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '资源发布', link: '/resource/', activeMatch: '^/resource/' },
      { text: '基础知识',
        items: [
          { text: 'IPEX', link: '/basic/ipex/' },
        ]
       },
    ],
    sidebar: [
      {
        text: '资源发布', link: '/resource/'
      },
      {
        text: '基础知识',
        items: [
          { text: 'IPEX', link: '/basic/ipex/' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Nuullll/arc-ai-wiki' }
    ],

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    outline: {
      label: '页面导航'
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    },

    langMenuLabel: '多语言',
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式'
  }
})
