export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
    "nuxt-lodash",
    "@nuxtjs/device",
    "@nuxtjs/i18n"
  ],
  i18n: {
    vueI18n: '@/i18n.config.js'
  },
  lodash: {
    prefix: "_",
    upperAfterPrefix: false,
  },
  css: [
    "primeicons/primeicons.css",
    "qweather-icons/font/qweather-icons.css",
    "./assets/css/global.css",
  ],
  piniaPluginPersistedstate: {
    storage: "localStorage",
  },
  imports: {
    dirs: ["stores/*.{ts,js,mjs,mts}"],
  },
  devtools: {
    enabled: false,
  },
  ssr: false,
  routeRules: {
    "/intro": { ssr: true },
    "/**": { ssr: false },
  },
  runtimeConfig: {
    public: {
      version: "1.3.3 Beta"
    },
  }
});