<script setup>
useHead({
  title: "HelloTab",
});
import { Analytics } from "@vercel/analytics/nuxt";

const features = ref([
  {
    icon: "pi pi-th-large",
    title: "可定制的小组件",
    description: "可扩展的小组件生态，更多实用小组件积极开发中",
  },
  {
    icon: "pi pi-cloud",
    title: "云端同步",
    description: "支持WebDAV同步，轻松实现多设备数据互通",
  },
  {
    icon: "pi pi-search",
    title: "智能搜索",
    description: "使用多种搜索引擎，助你高效访问常用网站",
  },
  {
    icon: "pi pi-palette",
    title: "个性化外观",
    description: "支持自由布局以及自定义背景，打造专属新标签页",
  },
]);
</script>

<template>
  <Analytics />
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-20">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <h1 class="text-4xl font-bold text-gray-800 mb-4">HelloTab</h1>
        <p class="text-xl text-gray-600">你的智能新标签页伙伴</p>
      </div>

      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto"
      >
        <div
          v-for="feature in features"
          :key="feature.title"
          class="bg-white rounded-xl p-6 shadow-lg transform hover:scale-105 transition-transform duration-300"
        >
          <div class="text-center">
            <i :class="[feature.icon, 'text-4xl text-blue-500 mb-4']"></i>
            <h3 class="text-xl font-semibold text-gray-800 mb-2">
              {{ feature.title }}
            </h3>
            <p class="text-gray-600">{{ feature.description }}</p>
          </div>
        </div>
      </div>

      <div
        class="max-w-2xl mx-auto mt-20 mb-16 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-8 shadow-lg transform hover:scale-105 transition-transform duration-300"
      >
        <div class="text-center">
          <i class="pi pi-browser text-5xl text-purple-500 mb-4"></i>
          <h2 class="text-2xl font-bold text-gray-800 mb-3">
            浏览器扩展版即将到来
          </h2>
          <p class="text-gray-600 mb-2">我们正在开发更强大的浏览器扩展版本</p>
          <p class="text-gray-500 text-sm">敬请期待！</p>
        </div>
      </div>

      <div class="text-center">
        <NuxtLink
          to="/"
          class="inline-block px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 font-semibold"
        >
          开始使用
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
