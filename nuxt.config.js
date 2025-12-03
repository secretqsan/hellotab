import { pwaConfig } from './pwa.config.js'
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
  features: {
    inlineStyles: true
  },
  css: [
    "primeicons/primeicons.css",
    "qweather-icons/font/qweather-icons.css",
    "~/assets/css/global.css",
  ],
  runtimeConfig: {
    public: {
      version: "1.11.5"
    },
  },
  imports: {
    dirs: ["~/app/stores"],
  },
  devtools: {
    enabled: false,
  },
  //module config
  pwa: pwaConfig,
  i18n: {
    bundle: {
      optimizeTranslationDirective: false
    },
    defaultLocale: 'zh',
    fallbackLocale: 'zh',
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
  lodash: {
    prefix: "_",
    upperAfterPrefix: false,
  }
});