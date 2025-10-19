export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
    "@nuxtjs/device",
    "@nuxtjs/i18n",
    "@chettapong/nuxt-lodash",
    '@vite-pwa/nuxt'
  ],
  pwa: {
    registerType: 'autoUpdate',
    devOptions: {
      enabled: true,
      type: 'module',
    },
    manifest: {
      name: 'HelloTab',
      short_name: 'HelloTab',
      description: 'HelloTab是一个现代化的新标签页替代方案，提供个性化的浏览体验和丰富的小部件功能。',
      theme_color: '#3B82F6',
      icons: [
        {
          src: 'icons/192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'icons/512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    },
    workbox: {
      globPatterns: [
        '**/*.{js,css,html,png,svg,woff2}'
      ],
      runtimeCaching: [
        {
          urlPattern: /^http/,
          handler: 'NetworkFirst',
          options: { cacheName: 'api-data' }
        }
      ]
    },
  },
  features: {
    inlineStyles: true
  },
  css: [
    "primeicons/primeicons.css",
    "qweather-icons/font/qweather-icons.css",
    "~/assets/css/global.css",
  ],

  i18n: {
    bundle: {
      optimizeTranslationDirective: false
    },
    defaultLocale: 'zh',
    locales: [
      {
        code: 'zh',
        name: '简体中文',
        file: 'zh.json'
      },
      {
        code: 'en',
        name: 'English',
        file: 'en.json'
      },
      {
        code: 'ja',
        name: '日本語',
        file: 'ja.json'
      }
    ],
  },
  piniaPluginPersistedstate: {
    storage: "localStorage",
  },
  imports: {
    dirs: ["~/app/stores"],
  },
  lodash: {
    prefix: "_",
    upperAfterPrefix: false,
  },
  devtools: {
    enabled: false,
  },
  runtimeConfig: {
    public: {
      version: "1.11.0"
    },
  }
});