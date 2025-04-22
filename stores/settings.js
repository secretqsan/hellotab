export const useSettingsStore = defineStore("settings", {
  state: () => ({
    language: "zh",
    searchEngine: {
      id: "bing",
      baseUrl: "https://www.bing.com/search?q=%s",
      imageSearchUrl: "",
      history: [],
      maxHistoryCnt: 50
    },
    aiSearchEngine: {
      id: "mitaso",
      baseUrl: "https://metaso.cn/?q=%s"
    },
    widgets: [
      {
        title: "",
        type: "calendar",
        size_x: 2,
        size_y: 1,
        e: {}
      },
      {
        title: "",
        type: "weather",
        size_x: 2,
        size_y: 2,
        e: {}
      },
      {
        title: "",
        type: "clock",
        size_x: 1,
        size_y: 1,
        e: {}
      },
      {
        type: "web",
        title: "哔哩哔哩",
        size_x: 1,
        size_y: 1,
        e: {
          url: "https://www.bilibili.com",
          icon: "/img/bilibili.png",
          customIcon: false
        }
      },
      {
        type: "web",
        title: "figma",
        size_x: 1,
        size_y: 1,
        e: {
          url: "https://www.figma.com/",
          icon: "https://static.figma.com/app/icon/1/touch-180.png",
          customIcon: false
        }
      },
      {
        type: "web",
        title: "百度网盘",
        size_x: 1,
        size_y: 1,
        e: {
          url: "https://pan.baidu.com/",
          icon: "/img/baidudisk.png",
          customIcon: false
        }
      },
      {
        type: "web",
        title: "淘宝",
        size_x: 1,
        size_y: 1,
        e: {
          url: "https://www.taobao.com",
          icon: "https://www.taobao.com/favicon.ico",
          customIcon: false
        }
      },
      {
        type: "web",
        title: "网易云音乐",
        size_x: 1,
        size_y: 1,
        e: {
          url: "https://music.163.com/",
          icon: "/img/163music.jpg",
          customIcon: false
        }
      },
      {
        type: "web",
        title: "网易邮箱",
        size_x: 1,
        size_y: 1,
        e: {
          url: "https://mail.163.com/",
          icon: "/img/163mail.svg",
          customIcon: false
        }
      },
      {
        title: "",
        type: "new",
        size_x: 1,
        size_y: 1,
        e: {}
      }
    ],
    appearance: {
      hideTitle: false,
      showHitokoto: false,
      background: "bing",
      e1: ""
    }
  }),
  persist: true,
});
