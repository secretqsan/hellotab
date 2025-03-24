<script setup>
const settingsStore = useSettingsStore();
const { searchEngine } = storeToRefs(settingsStore);
const currentPage = ref(1);
const itemsPerPage = 5;
const searchEngineCandidates = ref([
  { id: "bingcn", name: "必应(国内用户使用)" },
  { id: "google", name: "Google" },
  { id: "bing", name: "Bing" },
  { id: "baidu", name: "百度" },
  { id: "duckduckgo", name: "DuckDuckGo" },
  { id: "custom", name: "自定义" },
]);
const urls = ref({
  bingcn: "https://www4.bing.com/search?q=",
  google: "https://www.google.com/search?q=",
  bing: "https://www.bing.com/search?q=",
  baidu: "https://www.baidu.com/s?wd=",
  duckduckgo: "https://www.duckduckgo.com/?q=",
  costum: "",
});

const paginatedHistory = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return searchEngine.value.history?.slice(start, end) || [];
});

const totalPages = computed(() => {
  return Math.ceil((searchEngine.value.history?.length || 0) / itemsPerPage);
});

watch(
  () => searchEngine.value.id,
  (newID, oldID) => {
    searchEngine.value.baseUrl = urls.value[newID];
  }
);
</script>

<template>
  <div class="p-4 flex flex-col gap-6">
    <div class="flex flex-col gap-2">
      <label class="text-md text-gray-600">默认搜索引擎</label>
      <div class="w-full overflow-x-scroll">
        <selector
          :candidates="searchEngineCandidates"
          v-model="searchEngine.id"
        />
      </div>
    </div>

    <div class="flex flex-col gap-2">
      <label class="text-md text-gray-600">URL</label>
      <input
        :disabled="searchEngine.id != 'custom'"
        v-model="searchEngine.baseUrl"
        type="text"
        :class="[
          'w-full px-4 py-2 border rounded-lg focus:border-blue-500 focus:outline-none',
          searchEngine.id != 'custom' ? 'text-gray-400' : '',
        ]"
        placeholder="请输入搜索引擎URL"
      />
    </div>

    <div class="flex flex-row items-center w-full">
      <label class="text-md text-gray-600">最大历史记录</label>
      <Placeholder />
      <input
        type="number"
        class="p-2 border rounded-lg focus:border-blue-500 focus:outline-none"
        min="10"
        max="100"
        v-model="searchEngine.maxHistoryCnt"
      />
    </div>
    <div class="flex flex-col gap-2">
      <label class="text-md text-gray-600">历史记录管理</label>
      <div
        class="flex flex-col gap-1 bg-white rounded-md p-2 border border-gray-200"
      >
        <div
          v-if="!searchEngine.history?.length"
          class="text-sm text-gray-400 text-center p-2"
        >
          暂无历史记录
        </div>
        <div
          v-for="(item, index) in paginatedHistory"
          :key="index"
          class="flex rounded-md flex-row items-center p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
        >
          <span class="text-sm text-gray-600 truncate">{{ item }}</span>
          <Placeholder />
          <button
            @click="
              searchEngine.history.splice(
                (currentPage - 1) * itemsPerPage + index,
                1
              )
            "
            class="text-sm text-red-500 hover:text-red-600 transition-colors"
          >
            <i class="pi pi-trash"></i>
          </button>
        </div>

        <div
          v-if="totalPages > 1"
          class="flex justify-center items-center gap-2 mt-5"
        >
          <button
            @click="currentPage--"
            :disabled="currentPage === 1"
            class="px-3 py-1 text-sm rounded-lg transition-colors"
            :class="
              currentPage === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-blue-500 hover:text-blue-600'
            "
          >
            <i class="pi pi-chevron-left"></i>
          </button>
          <span class="text-sm text-gray-600"
            >{{ currentPage }} / {{ totalPages }}</span
          >
          <button
            @click="currentPage++"
            :disabled="currentPage === totalPages"
            class="px-3 py-1 text-sm rounded-lg transition-colors"
            :class="
              currentPage === totalPages
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-blue-500 hover:text-blue-600'
            "
          >
            <i class="pi pi-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
