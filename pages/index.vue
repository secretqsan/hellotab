<script setup>
useHead({
  title: "HelloTab",
});
import { Analytics } from "@vercel/analytics/nuxt";

const onlineBackgroundUrl = ref("");
const imageStorage = useImageStore();
const { pictures } = storeToRefs(imageStorage);
const settingPanel = ref(null);

const settingStore = useSettingsStore();
const localSettings = useLocalSettingsStore();
const {
  syncEnabled,
  webdavTestedOk,
  webdavUrl,
  webdavUsername,
  webdavPassword,
} = storeToRefs(localSettings);
const { widgets, appearance } = storeToRefs(settingStore);
import Client from "~/utils/webdav";
import { debounce } from "lodash";
const uploadSettings = debounce(async () => {
  const client = new Client(`/api/proxy/${webdavUrl.value}`, {
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
const uploadImages = debounce(async () => {
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
  $fetch(
    "/api/proxy/https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1"
  )
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
    <div class="flex flex-row w-full">
      <Placeholder />
      <div
        class="text-white hover:bg-white/20 w-12 h-12 rounded-lg flex items-center justify-center"
        @click="
          () => {
            settingPanel.show('search');
          }
        "
      >
        <i class="pi pi-cog text-xl"></i>
      </div>
    </div>
    <div class="h-20 min-h-10"/>
    <searchBox class="z-10" />
    <div class="h-20 min-h-10"/>
    <WidgetsPanel class="flex-1 w-full"/>
  </div>
  <SettingsMain ref="settingPanel"/>
</template>