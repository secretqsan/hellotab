export const pwaConfig = {
  registerType: 'autoUpdate',
  devOptions: {
    // dev 下关闭 SW：它会拦截所有模块请求并逐一过 NetworkFirst 缓存，显著拖慢开发服务器
    // 需要调试 SW 行为时临时改回 true 即可
    enabled: false,
    type: 'module',
    suppressWarnings: true
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
    navigateFallbackAllowlist: [/^\/$/],
    globPatterns: [
      '**/*.*'
    ],
    runtimeCaching: [
        {
          urlPattern: /^http/,
          handler: 'NetworkFirst',
          options: { 
            cacheName: 'api',
          }
        }
    ]
  },
}