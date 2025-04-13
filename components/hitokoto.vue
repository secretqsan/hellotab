<script setup>
const settingStore = useSettingsStore();
const { appearance } = storeToRefs(settingStore);
const { data: hitokotoResponse } = await useFetch("https://v1.hitokoto.cn/", {
  params: {
    c: "i",
    c: "k",
    encode: "json",
  }
});
</script>
<template>
  <div>
    <ClientOnly>
    <div class="flex flex-col text-white gap-2" v-if="appearance.showHitokoto">
      <div class="flex flex-row items-center justify-center text-lg">
        <span class="mr-8 mb-4">『</span>
        <span >{{ hitokotoResponse.hitokoto }}</span>
        <span class="ml-8 mt-4">』</span>
      </div>
      <div class="text-sm text-gray-100 text-right">
        —— {{ hitokotoResponse.from_who }}「{{ hitokotoResponse.from }}」
      </div>
    </div>
  </ClientOnly>
  </div>

</template>
