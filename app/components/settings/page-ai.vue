<script setup>
const aiSearchEngineCandidate = ref([
  { id: "mitaso", name: "秘塔搜索" },
  { id: "perplexity", name: "Perplexity" },
]);
const urls = ref({
  mitaso: "https://metaso.cn/?q=%s",
  perplexity: "https://www.perplexity.ai/?q=%s",
});
const settings = useSettingsStore();
const { aiSearchEngine } = storeToRefs(settings);
watch(
  () => aiSearchEngine.value.id,
  (newId, oldId) => {
    aiSearchEngine.value.baseUrl = urls.value[newId];
  }
);
</script>

<template>
  <div class="p-4 flex flex-col gap-6">
    <label class="text-md text-gray-600">搜索框无内容时按 <CustomKeyboard>Space</CustomKeyboard> 以唤起。</label>
    <div class="flex flex-col gap-2">
      <label class="text-md text-gray-600">AI搜索服务提供商</label>
      <CustomSelector
        :candidates="aiSearchEngineCandidate"
        v-model="aiSearchEngine.id"
      />
    </div>
  </div>
</template>
