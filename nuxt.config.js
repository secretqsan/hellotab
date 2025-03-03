export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
  ],
  css: [
    "primeicons/primeicons.css",
    "qweather-icons/font/qweather-icons.css",
    "./static/css/global.css",
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
      version: "1.1.5 Beta",
      platform: "Web"
    },
  },
});
