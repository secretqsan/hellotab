export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'zh',
    messages: {
      zh: {
        search: {
          search: '搜索',
        },
        menu: {
          main: {
            general: '通用',
            search: '搜索',
            ai: 'AI',
            appearance: '外观',
            widgets: '小组件',
            website: '网址导航',
            sync: '同步',
            about: '关于',
            setting: '设置中心',
          },
          general:{
            language: '语言',
          }
        },
        intro: {
          slogan: '你的智能新标签页伙伴',
        }
      },
      en: {
        search: {
          search: 'Search',
        },
        menu: {
          main: {
            general: 'General',
            search: 'Search',
            ai: 'AI',
            appearance: 'Appearance',
            widgets: 'Widgets',
            website: 'Website',
            sync: 'Sync',
            about: 'About',
            setting: 'Settings',
          },
          general:{
            language: 'Language',
          }
        },
        intro: {
          slogan: 'Your Smart New Tab Page Buddy', 
        }
      }
    }
}))
  