const popularWebsites = [
  {
    name: "娱乐",
    sites: [
      { name: "哔哩哔哩", url: "https://www.bilibili.com", icon: "" },
      { name: "爱奇艺", url: "https://www.iqiyi.com/", icon: "" },
      { name: "抖音", url: "https://www.douyin.com/", icon: "" },
      { name: "4399", url: "https://4399.com", icon: "" },
      { name: "QQ音乐", url: "https://y.qq.com/", icon: "" },
      {
        name: "网易云音乐",
        url: "https://music.163.com/",
        icon: "/icons/163music.jpg",
      },
      { name: "腾讯视频", url: "https://v.qq.com/", icon: "" },
    ],
  },
  {
    name: "AI",
    sites: [
      {
        name: "Deepseek",
        url: "https://chat.deepseek.com",
        icon: "https://www.deepseek.com/favicon.ico",
      },
      {
        name: "Kimi",
        url: "https://kimi.moonshot.cn/",
        icon: "https://statics.moonshot.cn/kimi-chat/favicon.ico",
      },
      {
        name: "豆包",
        url: "https://www.doubao.com/chat/",
        icon: "https://lf-flow-web-cdn.doubao.com/obj/flow-doubao/doubao/web/logo-icon.png",
      },
      {
        name: "Gamma",
        url: "https://gamma.app/",
        icon: "https://gamma.app/favicons/favicon-192.svg",
      },
      {
        name: "可图AI生图",
        url: "https://kolors.kuaishou.com/",
        icon: "https://h1.static.yximgs.com/kos/nlav111937/images/logo.ico",
      },
      {
        name: "可灵AI视频",
        url: "https://kling.kuaishou.com/",
        icon: "https://s2-111386.kwimgs.com/bs2/mmu-aiplatform-temp/kling/kling-logo.png",
      },
    ],
  },
  {
    name: "社交",
    sites: [
      { name: "微博", url: "https://weibo.com", icon: "" },
      { name: "小红书", url: "https://www.xiaohongshu.com/", icon: "" },
      { name: "豆瓣", url: "https://www.douban.com/", icon: "" },
      { name: "米游社", url: "https://www.miyoushe.com/ys/", icon: "" },
      { name: "outlook", url: "https://outlook.office365.com/mail/", icon: "" },
      {
        name: "网易邮箱",
        url: "https://mail.163.com/",
        icon: "https://dashi.163.com/favicon.ico",
      },
    ],
  },
  {
    name: "效率工具",
    sites: [
      { name: "飞书", url: "https://www.feishu.cn/", icon: "" },
      {
        name: "Notion",
        url: "https://www.notion.so/",
        icon: "https://www.notion.com/front-static/favicon.ico",
      },
      { name: "知乎", url: "https://www.zhihu.com", icon: "" },
      {
        name: "office",
        url: "https://m365.cloud.microsoft",
        icon: "https://res.cdn.office.net/officehub/images/content/images/favicon_copilot-4370172aa6.ico",
      },
      {
        name: "deepl",
        url: "https://www.deepl.com/",
        icon: "https://static.deepl.com/img/logo/deepl-logo-blue.svg",
      },
    ],
  },
  {
    name: "设计",
    sites: [
      {
        name: "figma",
        url: "https://www.figma.com/",
        icon: "https://static.figma.com/app/icon/1/touch-180.png",
      },
      {
        name: "Unsplash",
        url: "https://unsplash.com/",
        icon: "",
      },
    ],
  },
  {
    name: "新闻",
    sites: [
      { name: "腾讯网", url: "https://www.qq.com", icon: "/icons/qq.ico" },
      { name: "网易新闻", url: "https://news.163.com", icon: "" },
      { name: "新华社", url: "https://www.xinhuanet.com", icon: "" },
      {
        name: "澎湃新闻",
        url: "https://www.thepaper.cn",
        icon: "",
      },
    ],
  },
  {
    name: "购物",
    sites: [
      { name: "淘宝", url: "https://www.taobao.com", icon: "" },
      { name: "京东", url: "https://www.jd.com", icon: "" },
    ],
  },
  {
    name: "开发",
    sites: [
      { name: "GitHub", url: "https://github.com", icon: "" },
      { name: "Vercel", url: "https://vercel.com", icon: "" },
      { name: "Cloudflare", url: "https://dash.cloudflare.com", icon: "" },
      {
        name: "阿里云",
        url: "https://www.aliyun.com",
        icon: "https://img.alicdn.com/tfs/TB1_ZXuNcfpK1RjSZFOXXa6nFXa-32-32.ico",
      },
      {
        name: "Azure",
        url: "https://portal.azure.com/",
        icon: "https://portal.azure.com/Content/static/PWA/Azure-512p-maskable.svg",
      },
      {
        name: "Nuxt",
        url: "https://nuxt.com/",
        icon: "https://nuxt.com/icon.png",
      },
      {
        name: "CSDN",
        url: "https://www.csdn.net/",
        icon: ""
      }
    ],
  },
  {
    name: "阅读",
    sites: [
      {
        name: "安娜的档案",
        url: "https://annas-archive.org/",
        icon: "/icons/anna_archive.png",
      },
      {
         name: "微信读书",
         url: "https://weread.qq.com/",
         icon: "",
      }
    ]
  },
  {
    name: "学习",
    sites: [
      {
        name: "学习通",
        url: "https://i.chaoxing.com",
        icon: "https://app.chaoxing.com/res/images/apk/logo.png",
      },
      {
        name: "MOOC",
        url: "https://www.icourse163.org/",
        icon: "/icons/mooc.png",
      },
      {
        name: "菜鸟教程",
        url: "https://www.runoob.com/",
        icon: "",
      },
      {
        name: "LeetCode",
        url: "https://leetcode.cn/",
        icon: "",
      },
      
    ],
  },
  {
    name: "科研",
    sites: [
      {
        name: "Web of Science",
        url: "https://www.webofscience.com/wos/",
        icon: "",
      },
      {
        name: "中国知网",
        url: "https://www.cnki.net/",
        icon: "",
      },
      {
        name: "Google Scholar",
        url: "https://scholar.google.com/",
        icon: "/icons/google_scholar.ico",
      },
    ],
  },
];
export { popularWebsites };
