<script setup>
const { setLocale, locale } = useI18n();

useSeoMeta({
  title: "HelloTab - 可定制的浏览器新标签页",
  description:
    "HelloTab 是一款浏览器新标签页扩展，支持小组件、WebDAV 云端同步、多种搜索引擎和自定义壁纸。可在 Edge 扩展商店安装，也可直接使用网页版。",
  ogTitle: "HelloTab - 可定制的浏览器新标签页",
  ogDescription:
    "小组件、WebDAV 同步、多种搜索引擎和自定义壁纸，打造自己的浏览器新标签页。",
  ogImage: "https://hellotab.top/icons/512.png",
  ogUrl: "https://hellotab.top/intro",
  ogType: "website",
});
useHead({
  link: [{ rel: "canonical", href: "https://hellotab.top/intro" }],
});

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

const releases = ref([
  {
    url: "downloads/hellotab-0.1.1.zip",
    icon: "/img/extension.svg",
    mainText: "zip版本",
    subText: "开发版本",
  },
  {
    url: "https://microsoftedge.microsoft.com/addons/detail/apcaagdmicpkhmldkepdadhkfglkimaf",
    icon: "/img/edge.svg",
    mainText: "Edge 扩展",
    subText: "扩展商店*",
  },
  {
    url: "#",
    icon: "/img/chrome.svg",
    mainText: "Chrome 扩展",
    subText: "敬请期待",
  },
  {
    url: "#",
    icon: "/img/firefox.svg",
    mainText: "Firefox 扩展",
    subText: "敬请期待",
  },
]);

function changeLanguage() {
  const languages = ["zh", "en", "ja"];
  const currentIndex = languages.indexOf(locale.value);
  const targetLang = languages[(currentIndex + 1) % languages.length];
  setLocale(targetLang);
}
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-2 flex flex-col items-center"
  >
    <div class="flex flex-row items-center gap-2 w-full mb-20">
      <CustomPlaceholder />
      <button
        class="w-10 h-10 bg-white hover:bg-gray-50 rounded-md shadow-md transition-all duration-300 hover:shadow-lg outline-none"
        @click="changeLanguage"
      >
        <span class="text-sm font-medium text-gray-800">{{
          locale == "en" ? "En" : locale == "ja" ? "日" : "中"
        }}</span>
      </button>
    </div>
    <h1 class="text-center text-4xl font-bold text-gray-800 mb-4">HelloTab</h1>
    <p class="text-center text-xl text-gray-600 mb-16">
      {{ $t("intro.slogan") }}
    </p>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl">
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

    <div class="text-center mt-16">
      <NuxtLink
        to="/"
        target="_blank"
        class="inline-block px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 font-semibold"
      >
        {{ $t("intro.startToUse") }} (Web)
      </NuxtLink>
    </div>
    <div
      v-if="$device.isDesktop"
      class="flex flex-row w-full mt-6 justify-center gap-2"
    >
      <div
        v-for="release in releases"
        class="flex flex-row items-center justify-center gap-4"
      >
        <a
          :href="release.url"
          class="group flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 rounded-full shadow-md transition-all duration-300 hover:shadow-lg"
        >
          <img :src="release.icon" class="w-6 h-6" />
          <div class="flex flex-col">
            <span class="text-sm font-medium text-gray-800">{{
              release.mainText
            }}</span>
            <span class="text-xs text-gray-500">{{ release.subText }}</span>
          </div>
          <i
            class="pi pi-download text-gray-400 group-hover:text-blue-500 transition-colors"
          ></i>
        </a>
      </div>
    </div>
    <div class="text-xs text-gray-500 mt-2">
      * 由于扩展商店的审核机制，扩展商店版本更新速度会慢于开发版本。
    </div>
  </div>
</template>
