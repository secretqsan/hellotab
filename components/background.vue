<script setup>
const imageStorage = useImageStore();
const { pictures } = storeToRefs(imageStorage);
const settingStore = useSettingsStore();
const { appearance} = storeToRefs(settingStore);

const { data:onlineBackgroundUrl } = await useFetch('/api/backgrounds')
const backgroundUrl = computed(() => {
  if (appearance.value.background == "custom" && appearance.value.e1) {
    if (!isNaN(appearance.value.e1)){
      return pictures.value[appearance.value.e1];
    } else {
      return appearance.value.e1;
    }
  } else if (appearance.value.background == "unsplash"){
    return onlineBackgroundUrl.value.unsplash;
  } else {
    return onlineBackgroundUrl.value.bing 
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