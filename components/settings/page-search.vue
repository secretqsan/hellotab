<script setup>
const settingsStore = useSettingsStore();
const { searchEngine } = storeToRefs(settingsStore);
const searchEngineCandidates = ref([
  { id: "google", name: "Google" },
  { id: "bing", name: "Bing" },
  { id: "baidu", name: "百度" },
  { id: "duckduckgo", name: "DuckDuckGo" },
  { id: "costum", name: "自定义" },
]);
const urls = ref({
  google: "https://www.google.com/search?q=",
  bing: "https://www.bing.com/search?q=",
  baidu: "https://www.baidu.com/s?wd=",
  duckduckgo: "https://www.duckduckgo.com/?q=",
  自定义: "",
});
watch(
  () => searchEngine.value.id,
  (newID, oldID) => {
    searchEngine.value.baseUrl = urls.value[newID];
  }
);
</script>

<template>
  <div class="p-4 space-y-6">
    <div class="flex flex-col gap-2">
      <label class="text-sm text-gray-600">默认搜索引擎</label>
      <selector
        :candidates="searchEngineCandidates"
        v-model="searchEngine.id"
      />
      <label class="text-sm text-gray-600 mb-2 block">URL</label>
      <input
        :disabled="searchEngine.id !== 'custom'"
        v-model="searchEngine.baseUrl"
        type="text"
        :class="[
          'w-full px-4 py-2 border rounded-lg focus:border-blue-500 focus:outline-none',
          searchEngine.id != 'custom' ? 'text-gray-400' : '',
        ]"
        placeholder="请输入搜索引擎URL"
      />
    </div>
  </div>
</template>
