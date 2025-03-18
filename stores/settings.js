export const useSettingsStore = defineStore("settings", {
  state: () => ({
    language: "zh-CN",
    searchEngine: {
      id: "bing",
      baseUrl: "https://www.bing.com/search?q=",
      history: [
        
      ],
      maxHistoryCnt: 50,
    },
    aiSearchEngine: {
      id: "mitaso",
      baseUrl: "https://metaso.cn/?q=",
    },
    glmApiKey: "",
    widgets: [
      {
        title: "哔哩哔哩",
        type: "web",
        size_x: 1,
        size_y: 1,
        e: {
          url: "https://www.bilibili.com",
          icon: "https://www.bilibili.com/favicon.ico",
          customIcon: false,
        },
      },
      { title: "", type: "calendar", size_x: 1, size_y: 1, e: {} },
      { title: "", type: "clock", size_x: 1, size_y: 1, e: {} },
      { title: "", type: "weather", size_x: 2, size_y: 2, e: {} },
      { title: "", type: "new", size_x: 1, size_y: 1, e: {} },
    ],
    appearance: {
      hideTitle: false,
      background: "bing",
      e1: "",
    },
  }),
  persist: true,
});
