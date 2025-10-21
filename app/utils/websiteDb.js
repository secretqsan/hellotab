const popularWebsites = [
  {
    name: "娱乐",
    sites: [
      { name: "哔哩哔哩", url: "https://www.bilibili.com", icon: "/img/bilibili.webp" },
      { name: "爱奇艺", url: "https://www.iqiyi.com/", icon: "" },
      { name: "抖音", url: "https://www.douyin.com/", icon: "" },
      { name: "4399", url: "https://4399.com", icon: "" },
      { name: "QQ音乐", url: "https://y.qq.com/", icon: "/img/qqmusic.webp" },
      {
        name: "网易云音乐",
        url: "https://music.163.com/",
        icon: "/img/163music.webp",
      },
      { name: "腾讯视频", url: "https://v.qq.com/", icon: "/img/qqvideo.webp" },
      { name: "CCTV", url: "https://tv.cctv.com/", icon: "/img/CCTV.svg" },
    ],
  },
  {
    name: "交通出行",
    sites: [
      {
        name: "百度地图",
        url: "https://map.baidu.com/",
        icon: "/img/baidumap.webp"
      },
      {
        name: "高德地图",
        url: "https://www.amap.com/",
        icon: "/img/amap.webp"
      },
      {
        name: "携程旅行",
        url: "https://www.ctrip.com/",
        icon: "/img/ctrip.webp"
      }
      
    ],
  },
  {
    name: "AI",
    sites: [
      {
        name: "Deepseek",
        url: "https://chat.deepseek.com",
        icon: "/img/deepseek.svg",
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
        icon: "/img/gamma.svg",
      },
      {
        name: "可灵AI视频",
        url: "https://kling.kuaishou.com/",
        icon: "https://s2-111386.kwimgs.com/bs2/mmu-aiplatform-temp/kling/kling-logo.png",
      },
      {
        name: "Mureka",
        url: "https://www.mureka.ai/",
        icon: "",
      },
      {
        name: "腾讯元宝",
        url: "https://yuanbao.tencent.com/",
        icon: "/img/yuanbao.webp",
      }
    ],
  },
  {
    name: "社交",
    sites: [
      { name: "微博", url: "https://weibo.com", icon: "/img/weibo.webp" },
      { name: "小红书", url: "https://www.xiaohongshu.com/", icon: "/img/xiaohongshu.webp" },
      { name: "豆瓣", url: "https://www.douban.com/", icon: "/img/douban.webp" },
      { name: "米游社", url: "https://www.miyoushe.com/ys/", icon: "/img/miyoushe.webp" },
      { name: "知乎", url: "https://www.zhihu.com", icon: "/img/zhihu.webp" },
    ],
  },
  {
    name: "通讯",
    sites: [
      { name: "outlook", url: "https://outlook.office365.com/mail/", icon: "/img/outlook.svg" },
      {
        name: "网易邮箱",
        url: "https://mail.163.com/",
        icon: "/img/163mail.svg",
      },
      {
        name: "Microsoft Teams",
        url: "https://teams.microsoft.com/",
        icon: ""
      },
    ] 
  },
  {
    name: "效率工具",
    sites: [
      {
        name: "Notion",
        url: "https://www.notion.so/",
        icon: "/img/notion.svg",
      },
      {
        name: "deepl",
        url: "https://www.deepl.com/",
        icon: "https://static.deepl.com/img/logo/deepl-logo-blue.svg",
      },
      {
        name: "Mocrosoft Forms",
        url: "https://forms.office.com/", 
        icon: "/img/forms.svg",
      },
      {
        name: "腾讯文档",
        url: "https://docs.qq.com/desktop/",
        icon: "/img/qqdoc.webp"
      },
      {
        name: "office",
        url: "https://m365.cloud.microsoft.com/",
        icon: "https://res.cdn.office.net/officehub/images/content/images/favicon_copilot-4370172aa6.ico",
      },
      { name: "飞书", url: "https://www.feishu.cn/", icon: "" },
      {
        name: "Xmind思维导图",
        url: "https://ai.xmind.cn/",
        icon: "/img/xmind.webp",
      },
      {
        name: "Descript",
        url: "https://web.descript.com/",
        icon: "/img/descript.webp"
      },
      {
        name: "Typst",
        url: "https://typst.app/",
        icon: "/img/typst.webp"
      },
      {
        name: "Folo",
        url: "https://app.follow.is/",
        icon: "/img/folo.svg",
      }
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
      {
        name: "Icons8",
        url: "https://icons8.com/",
        icon: "/img/icons8.svg",
      },
      {
        name: "Draw.io",
        url: "https://app.diagrams.net/",
        icon: "/img/drawio.svg",
      },
      {
        name: "Color Space",
        url: "https://mycolor.space/",
        icon: "/img/colorspace.webp",
      }
    ],
  },
  {
    name: "云存储",
    sites: [
      {
        name: "百度网盘",
        url: "https://pan.baidu.com/",
        icon: "/img/baidudisk.webp"
      },
      {
        name: "Onedrive",
        url: "https://onedrive.live.com",
        icon: "/img/onedrive.svg",
      },
    ],
  },
  {
    name: "新闻",
    sites: [
      { name: "腾讯网", url: "https://www.qq.com", icon: "/img/qq.ico" },
      { name: "网易新闻", url: "https://news.163.com", icon: "/img/netease_news.webp" },
      { name: "新华社", url: "https://www.xinhuanet.com", icon: "/img/xinhua.webp" },
      { name: "搜狐", url: "https://www.sohu.com/", icon: "/img/souhu.webp" },
      {
        name: "澎湃新闻",
        url: "https://www.thepaper.cn",
        icon: "/img/pengpai_news.webp",
      },
    ],
  },
  {
    name: "购物",
    sites: [
      { name: "淘宝", url: "https://www.taobao.com", icon: "" },
      { name: "京东", url: "https://www.jd.com", icon: "/img/jd.webp" },
      { name: "拼多多", url: "https://www.pinduoduo.com/", icon: "/img/pdd.webp" },
    ],
  },
  {
    name: "开发",
    sites: [
      { name: "GitHub", url: "https://github.com", icon: "/img/github.svg" },
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
      },
      {
        name: "Postman",
        url: "https://www.postman.com/",
        icon: "/img/postman.svg",
      },
      {
        name: "VS Code",
        url: "https://vscode.dev/",
        icon: "/img/vsc.svg",
      },
      {
          name: "OHTTPS",
          url: "https://ohttps.com/",
          icon: "/img/ohttps.ico",
      }
    ],
  },
  {
    name: "阅读",
    sites: [
      {
        name: "安娜的档案",
        url: "https://annas-archive.org/",
        icon: "/img/anna_archive.webp",
      },
      {
         name: "微信读书",
         url: "https://weread.qq.com/",
         icon: "",
      },
      {
        name: "简书",
        url: "https://www.jianshu.com/",
        icon: "/img/jianshu.webp",
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
        icon: "/img/mooc.webp",
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
      {
        name: "多邻国",
        url: "https://www.duolingo.com/",
        icon: "/img/duolingo.svg",
      }
    ],
  },
  {
    name: "科研",
    sites: [
      {
        name: "Web of Science",
        url: "https://www.webofscience.com/wos/",
        icon: "/img/webofscience.svg",
      },
      {
        name: "中国知网",
        url: "https://www.cnki.net/",
        icon: "",
      },
      {
        name: "Google Scholar",
        url: "https://scholar.google.com/",
        icon: "/img/google_scholar.ico",
      },
    ],
  },
];
export { popularWebsites };
