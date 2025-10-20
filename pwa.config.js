export const pwaConfig = {
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
}