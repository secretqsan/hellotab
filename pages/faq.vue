<script setup>
const route = useRoute();
const faqItems = ref([
  {
    id: 'settingsSync',
    question: '如何同步我的设置？',
    answer: '您可以在设置页面的同步选项中，选择使用WebDAV进行设置同步。这样您可以在不同设备间保持一致的使用体验。',
    isOpen: false
  },
  {
    id: 'browserSupport',
    question: '支持哪些浏览器？',
    answer: 'HelloTab目前支持以下主流浏览器：<br>- Google Chrome<br>- Microsoft Edge<br>对FireFox的支持仍不完善，正在努力开发中。',
    isOpen: false
  },
  {
    id: 'locationPermission',
    question: '为什么需要地理位置？',
    answer: '天气小组件需要根据地理位置来提供准确的天气信息。',
    isOpen: false
  },
  {
    id: 'failToFetchLocation',
    question: '天气小组件提示无法获取位置？',
    answer: '首先确认您的浏览器是否允许获取地理位置信息。在允许相关权限后，请尝试刷新页面或重新打开浏览器。<br>国内的Chrome用户可能会出现即使正确设置权限也无法获取位置的情况。您可以尝试在地址栏中输入"chrome://flags/#enable-location-provider-manager"，将"Default"选项改为"Enabled PlatformOnly"，然后重启浏览器。',
    isOpen: false

  },
  {
    id: 'bingSearchFailure',
    question: 'bing搜索白屏怎么办？',
    answer: '目前认为是bing的问题，把搜索引擎换成bing(国内用户使用)可以解决。',
    isOpen: false
  }
]);
onMounted(() => {
  const id = route.query.q;
  if (id) {
    const item = faqItems.value.find(item => item.id === id);
    if (item) {
      item.isOpen = true;
    }
  }
});
</script>
<template>
  <div class="max-w-3xl mx-auto p-8">
    <h1 class="text-center mb-12 text-3xl font-bold tracking-tight text-gray-800">常见问题</h1>
    <div class="flex flex-col gap-6">
      <div v-for="(item, index) in faqItems" :key="index" 
        class="rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 bg-white">
        <div 
          class="p-5 cursor-pointer flex justify-between items-center font-medium bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
          @click="item.isOpen = !item.isOpen"
        >
          <span class="text-lg text-gray-700">{{ item.question }}</span>
          <span class="text-xl transition-transform duration-300 ease-in-out text-gray-500" :class="{ 'rotate-90': item.isOpen }">›</span>
        </div>
        <div 
          class="overflow-hidden transition-all duration-300 ease-in-out"
          :class="{ 'max-h-0': !item.isOpen, 'max-h-[500px]': item.isOpen }"
        >
          <div class="p-5 leading-relaxed text-gray-600" v-html="item.answer"></div>
        </div>
      </div>
    </div>
  </div>
</template>

