<script setup>
const imageStorage = useImageStore();
const settingStore = useSettingsStore();
const localSettings = useLocalSettingsStore();
const { pictures } = storeToRefs(imageStorage);
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
  if (syncEnabled.value && webdavTestedOk.value) {
    fetchSettings();
  }
});
</script>
<template>
    <div></div>
</template>