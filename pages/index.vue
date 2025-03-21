<script setup>
import { Analytics } from "@vercel/analytics/nuxt";

useHead({
  title: "HelloTab",
  meta: [
    {name: "keywords", content: "新标签页,标签页定制，效率工具"},
    {name: "description", content: "试用HelloTab。HelloTab是一款功能强大的浏览器新标签页，提供可定制的小组件、云端同步、智能搜索和个性化外观等特性，让你的浏览体验更加高效和个性化。"},
  ]
});

const imageStorage = useImageStore();
const settingStore = useSettingsStore();
const localSettings = useLocalSettingsStore();
const runtimeVariables = useRuntimeStore();
const { pictures } = storeToRefs(imageStorage);
const { language } = storeToRefs(settingStore);
const { crxId, settingPanel, toast } = storeToRefs(runtimeVariables);
const { setLocale } = useI18n();
const {
  syncEnabled,
  webdavTestedOk,
  webdavUrl,
  webdavUsername,
  webdavPassword,
} = storeToRefs(localSettings);

const uploadSettings = _debounce(async () => {
  const client = new webdavClient(`/api/proxy/${webdavUrl.value}`, {
    subdir: "hellotab",
    username: webdavUsername.value,
    password: webdavPassword.value,
  });
  try {
    await client.uploadFile(
      "settings.json",
      JSON.stringify(settingStore.$state, null, 0)
    );
  } catch (error) {
    console.error("同步失败:", error);
  }
}, 1000);
const uploadImages = _debounce(async () => {
  const client = new Client(`/api/proxy/${webdavUrl.value}`, {
    subdir: "hellotab",
    username: webdavUsername.value,
    password: webdavPassword.value,
  });
  try {
    var files = await client.listFiles();
    var savedImages = files.filter((file) => file != "settings.json");
    var localImages = Object.keys(pictures.value);
    var idToUpload = localImages.filter(
      (image) => !savedImages.includes(image)
    );
    var idToDelete = savedImages.filter(
      (image) => !localImages.includes(image)
    );
    for (var imageId of idToUpload) {
      await client.uploadFile(imageId, pictures.value[imageId]);
    }
    for (var imageId of idToDelete) {
      await client.deleteFile(imageId);
    }
  } catch (error) {
    console.error("同步失败:", error);
  }
}, 1000);

async function fetchSettings() {
  const client = new Client(`/api/proxy/${webdavUrl.value}`, {
    subdir: "hellotab",
    username: webdavUsername.value,
    password: webdavPassword.value,
  });
  const decoder = new TextDecoder("utf-8");
  try {
    var files = await client.listFiles();
    var savedImages = files.filter((file) => file != "settings.json");
    var localImages = Object.keys(pictures.value);
    var idToDownload = savedImages.filter(
      (image) => !localImages.includes(image)
    );
    var idToDelete = localImages.filter(
      (image) => !savedImages.includes(image)
    );
    for (var imageId of idToDownload) {
      pictures.value[imageId] = decoder.decode(await client.fetchFile(imageId));
    }
    for (var imageId of idToDelete) {
      delete pictures.value[imageId];
    }
    var settings = decoder.decode(await client.fetchFile("settings.json"));

    settingStore.$patch(JSON.parse(settings));
  } catch (error) {
    console.error("同步失败:", error);
  }
}
watch(
  () => settingStore.$state,
  () => {
    if (syncEnabled.value && webdavTestedOk.value) {
      uploadSettings();
    }
  },
  { deep: true }
);

watch(
  pictures,
  () => {
    if (syncEnabled.value && webdavTestedOk.value) {
      uploadImages();
    }
  },
  { deep: true }
);

onMounted(() => {
  const body = document.getElementsByTagName("body")[0];
  const extensionDiv = body.querySelector("#extension");
  if (extensionDiv) {
    crxId.value = extensionDiv.innerHTML;
  }
  if (syncEnabled.value && webdavTestedOk.value) {
    fetchSettings();
  }
  setLocale(language.value ?? "zh");
});

</script>

<template>
  <Analytics />
  <div class="z-10 p-4 h-screen w-screen flex flex-col items-center relative">
    <div class="flex flex-row w-full gap-2">
      <Placeholder />
      <ClientOnly>
        <NuxtLink
          v-if="crxId=='' && $device.isDesktop"
          title="下载扩展"
          class="text-white hover:bg-white/30 w-12 h-12 rounded-lg flex items-center justify-center"
          to="/intro"
          target="_blank"
        >
          <i class="pi pi-download text-xl"></i>
        </NuxtLink>
      </ClientOnly>
      <div
        class="text-white hover:bg-white/30 w-12 h-12 rounded-lg flex items-center justify-center"
        title="设置"
        @click="
          () => {
            settingPanel.show('general');
          }
        "
      >
        <i class="pi pi-cog text-xl"></i>
      </div>
    </div>
    <div :class="[$device.isDesktop || $device.isTablet ? 'h-20' : 'h-10']" />
    <searchBox class="z-30" />
    <div class="h-20 min-h-10" />
    <WidgetsPanel class="flex-1 w-full" />
    
    
  </div>
  <Background/>
  <SettingsMain ref="settingPanel" />
  <Toast ref="toast" />
</template>
