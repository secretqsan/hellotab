<script setup>
const settingStore = useSettingsStore();
const { appearance } = storeToRefs(settingStore);
const imageStorage = useImageStore();
const { pictures } = storeToRefs(imageStorage);
const backgroundOrigin = ref([
  { id: "bing", name: "必应每日一图" },
  { id: "custom", name: "自定义" }
]);
const customBackgroundUrl = ref("");
const fileInputRef = ref();

function uploadFile(file) {
  if (file && file.type.startsWith("image/")) {
    const reader = new FileReader();
    reader.onload = (e) => {
      delete pictures.value[appearance.value.e1];
      var id = pictureProxy(e.target.result);
      appearance.value.e1 = id;
    };
    reader.readAsDataURL(file);
  }
}

const handleFileSelect = (event) => {
  const file = event.target.files[0];
  uploadFile(file);
};

const handleDrop = (event) => {
  const file = event.dataTransfer.files[0];
  uploadFile(file);
};

const { data:bingBackgroundUrl } = await useFetch(proxyedUrl("https://www.bing.com/HPImageArchive.aspx"),{
  params: {
    n: 1,
    idx: 0,
    format: "js",
  },
  transform: (data) => {
    return `https://www.bing.com${data.images[0].url}`;
  }
})

const imageUrl = computed(() => {
  if (appearance.value.background == "bing") {
    return bingBackgroundUrl.value;
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
  <div class="p-4 space-y-6">
    <div class="flex flex-col gap-2">
      <label class="text-sm text-gray-600">背景图片</label>
      <div class="flex flex-col gap-4">
        <selector
          :candidates="backgroundOrigin"
          v-model="appearance.background"
        />
        <div
          v-if="appearance.background == 'customUrl'"
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
        <div
          :class="[
            'w-full min-h-60 border rounded-lg border-1 flex flex-col bg-white items-center justify-center overflow-hidden ',
            appearance.background == 'customImage'
              ? 'cursor-pointer'
              : '',
          ]"
          @click="() => {
            if(appearance.background == 'customImage'){
              fileInputRef.click()
            }
          }"
          @dragover.prevent
          @drop.prevent="handleDrop"
        >
          <input
            type="file"
            ref="fileInputRef"
            class="hidden"
            accept="image/*"
            @change="handleFileSelect"
          />
          <div
            v-if="appearance.background == 'customImage' && appearance.e1 == ''"
            class="flex flex-col items-center gap-4 text-gray-400"
          >
            <i class="pi pi-upload text-4xl"></i>
            <span class="text-sm">点击或拖拽图片到此处</span>
          </div>
          <img
            v-else
            :src="imageUrl"
            class="w-full"
          />
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-2">
      <label class="text-sm text-gray-600">小组件</label>
      <div class="flex items-center gap-2">
        <label class="text-sm text-gray-600">隐藏小组件标题</label>
        <placeholder />
        <div
          :class="[
            'relative inline-block w-12 h-6 rounded-full transition duration-200 ease-in-out cursor-pointer',
            appearance.hideTitle ? 'bg-blue-500' : 'bg-gray-200',
          ]"
          @click="appearance.hideTitle = !appearance.hideTitle"
        >
          <div
            :class="[
              'absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out',
              appearance.hideTitle ? 'translate-x-6' : '',
            ]"
          />
        </div>
      </div>
    </div>
  </div>
</template>
