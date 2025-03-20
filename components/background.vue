<script setup>
const imageStorage = useImageStore();
const { pictures } = storeToRefs(imageStorage);
const settingStore = useSettingsStore();
const { appearance} = storeToRefs(settingStore);

const { data:onlineBackgroundUrl } = await useFetch(proxyedUrl("https://www.bing.com/HPImageArchive.aspx"),{
  params: {
    n: 1,
    idx: 0,
    format: "js",
  },
  transform: (data) => {
    return `https://www.bing.com${data.images[0].url}`;
  }
})
const backgroundUrl = computed(() => {
  if (appearance.value.background == "custom" && appearance.value.e1) {
    if (!isNaN(appearance.value.e1)){
      return pictures.value[appearance.value.e1];
    } else {
      return appearance.value.e1;
    }
  } else {
    return onlineBackgroundUrl.value;
  }
});

</script>
<template>
    <div class="fixed top-0 left-0 h-screen w-screen">
      <ClientOnly>
        <img :src="backgroundUrl" class="w-full h-full object-cover object-center" />
      </ClientOnly>
    </div>
</template>