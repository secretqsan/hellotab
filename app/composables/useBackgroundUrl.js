export async function useBackgroundUrl() {
  const imageStorage = useImageStore();
  const { pictures } = storeToRefs(imageStorage);
  const settingStore = useSettingsStore();
  const { appearance } = storeToRefs(settingStore);
  const { data: onlineBackgroundUrl } = await useFetch("/api/backgrounds", {
    key: "backgrounds",
  });

  return computed(() => {
    if (appearance.value.background == "custom" && appearance.value.e1) {
      if (!isNaN(appearance.value.e1)) {
        return pictures.value[appearance.value.e1];
      }
      return appearance.value.e1;
    }
    if (appearance.value.background == "unsplash") {
      return onlineBackgroundUrl.value?.unsplash;
    }
    return onlineBackgroundUrl.value?.bing;
  });
}
