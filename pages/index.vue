<script setup>
import { Analytics } from "@vercel/analytics/nuxt";

useHead({
  title: "HelloTab",
});

const imageStorage = useImageStore();
const settingStore = useSettingsStore();
const localSettings = useLocalSettingsStore();
const sharedComponents = useSharedComponentsStore();
const { settingPanel, toast } = storeToRefs(sharedComponents);
const { pictures } = storeToRefs(imageStorage);
const { appearance, language } = storeToRefs(settingStore);
const { setLocale } = useI18n();
const {
  syncEnabled,
  webdavTestedOk,
  webdavUrl,
  webdavUsername,
  webdavPassword,
} = storeToRefs(localSettings);
const onlineBackgroundUrl = ref("");

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
  if (syncEnabled.value && webdavTestedOk.value) {
    fetchSettings();
  }
  setLocale(language.value?? "zh");
  $fetch(proxyedUrl("https://www.bing.com/HPImageArchive.aspx"), {
    params: {
      n: 1,
      idx: 0,
      format: "js",
    },
  })
    .then((res) => {
      onlineBackgroundUrl.value = `https://www.bing.com${res.images[0].url}`;
    })
    .catch((err) => {
      console.log(err);
    });
});
const backgroundUrl = computed(() => {
  if (appearance.value.background == "自定义" && appearance.value.e1) {
    return pictures.value[appearance.value.e1];
  } else {
    return onlineBackgroundUrl.value;
  }
});
</script>

<template>
  <Analytics />

  <div
    class="p-4 h-screen w-screen bg-cover bg-center bg-no-repeat flex flex-col items-center"
    :style="`background-image: url(${backgroundUrl})`"
  >
    <div class="flex flex-row w-full gap-2">
      <Placeholder />
      <NuxtLink
        v-if="!extensionInstalled() && $device.isDesktop"
        title="下载扩展"
        class="text-white hover:bg-white/30 w-12 h-12 rounded-lg flex items-center justify-center"
        to="/intro"
        target="_blank"
      >
        <i class="pi pi-download text-xl"></i>
      </NuxtLink>
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
    <div :class="[
      ($device.isDesktop || $device.isTablet)? 'h-20': 'h-10'
    ]" />
    <searchBox class="z-10" />
    <div class="h-20 min-h-10" />
    <WidgetsPanel class="flex-1 w-full" />
  </div>
  <SettingsMain ref="settingPanel" />
  <Toast ref="toast" />
</template>
