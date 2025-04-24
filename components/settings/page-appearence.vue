<script setup>
const settingStore = useSettingsStore();
const { appearance } = storeToRefs(settingStore);
const imageStorage = useImageStore();
const { pictures } = storeToRefs(imageStorage);
const backgroundOrigin = ref([
  { id: "bing", name: "必应每日一图" },
  { id: "unsplash", name: "Unsplash" },
  { id: "custom", name: "自定义" },
]);
const customBackgroundUrl = ref("");
const customBackgroundData = ref("");

watch(
  () => customBackgroundData.value,
  (newValue, oldValue) => {
    if (newValue != oldValue) {
      delete pictures.value[appearance.value.e1];
      var id = pictureProxy(newValue);
      appearance.value.e1 = id;
    }
  }
);
const { data:onlineBackgroundUrl } = await useFetch('/api/backgrounds')
const imageUrl = computed(() => {
  if (appearance.value.background == "bing") {
    return onlineBackgroundUrl.value.bing;
  } else if (appearance.value.background == "unsplash") {
    return onlineBackgroundUrl.value.unsplash;
  } else {
    if (!isNaN(appearance.value.e1)) {
      return pictures.value[appearance.value.e1];
    } else {
      return appearance.value.e1;
    }
  }
});
</script>

<template>
  <div class="p-4 flex flex-col gap-6">
    <div class="flex flex-col gap-2">
      <label class="text-md text-gray-600">背景图片</label>
      <div class="flex flex-col gap-4">
        <div class="w-full overflow-x-scroll">
          <CustomSelector
            :candidates="backgroundOrigin"
            v-model="appearance.background"
          />
        </div>
        
        <div
          v-if="appearance.background == 'custom'"
          class="flex flex-row gap-2"
        >
          <input
            v-model="customBackgroundUrl"
            class="flex-1 px-4 py-2 border rounded-lg transition-colors focus:border-blue-500 focus:outline-none"
            placeholder="自定义图片URL"
          />
          <button
            @click="
              () => {
                appearance.e1 = customBackgroundUrl;
              }
            "
            class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            应用
          </button>
        </div>
        <CustomImageUploader 
          class="w-full min-h-60 border bg-white" 
          :alt="imageUrl"
          v-model="customBackgroundData"
        />
      </div>
    </div>
    <div class="flex flex-col gap-2">
      <label class="text-md text-gray-600">小组件</label>
      <div class="flex items-center gap-2">
        <label class="text-md text-gray-600">隐藏小组件标题</label>
        <CustomPlaceholder />
        <CustomSwitch v-model="appearance.hideWidgetTitle" />
      </div>
    </div>
    <div class="flex flex-col gap-2">
      <label class="text-md text-gray-600">一言</label>
      <div class="flex items-center gap-2">
        <label class="text-md text-gray-600">显示一言</label>
        <CustomPlaceholder />
        <CustomSwitch v-model="appearance.showHitokoto" />
      </div>
    </div>
  </div>
</template>
