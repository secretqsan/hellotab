<script setup>
useSeoMeta({
  title: "HelloTab 新标签页",
  description:
    "打开 HelloTab 新标签页，使用搜索、小组件、每日壁纸和常用网站。",
  ogTitle: "HelloTab 新标签页",
  ogDescription:
    "打开 HelloTab 新标签页，使用搜索、小组件、每日壁纸和常用网站。",
  ogUrl: "https://hellotab.top",
  ogType: "website",
});
useHead({
  link: [{ rel: "canonical", href: "https://hellotab.top" }],
});
const settingStore = useSettingsStore();
const runtimeVariables = useRuntimeStore();
const { language } = storeToRefs(settingStore);
const { crxId, settingPanel, toast } = storeToRefs(runtimeVariables);
const { setLocale } = useI18n();
onMounted(() => {
  const body = document.getElementsByTagName("body")[0];
  setTimeout(() => {
    const extensionDiv = body.querySelector("#extension");
    if (extensionDiv) {
      crxId.value = extensionDiv.innerHTML;
    }
    else {
      crxId.value = '';
    }
  }, 1000);
  setLocale(language.value ?? "zh");
});
</script>

<template>
  <ConfigSyncHandler />
  <NuxtPwaManifest />
  <div
    class="z-10 p-4 h-screen w-screen flex flex-col gap-10 items-center fixed"
  >
    <div
      :class="[
        'flex flex-row w-full gap-2',
        $device.isDesktop || $device.isTablet ? 'mb-10' : '',
      ]"
    >
      <CustomPlaceholder />
      <ClientOnly>
        <NuxtLink
          v-if="crxId == '' && $device.isDesktop"
          title="下载扩展"
          class="text-white hover:bg-white/30 w-12 h-12 rounded-lg flex items-center justify-center outline-none"
          :to="language == 'zh' ? '/intro/' : `/${language}/intro/`"
          target="_blank"
        >
          <i class="pi pi-download text-xl"></i>
        </NuxtLink>
      </ClientOnly>
      <NuxtLink
        title="帮助"
        class="text-white hover:bg-white/30 w-12 h-12 rounded-lg flex items-center justify-center outline-none"
        to="/faq"
        target="_blank"
      >
        <i class="pi pi-question-circle text-xl"></i>
      </NuxtLink>
      <div
        class="text-white hover:bg-white/30 w-12 h-12 rounded-lg flex items-center justify-center cursor-pointer"
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
    <SearchBox class="z-30 mb-10" />
    <WidgetsPanel class="flex-1 w-full" />
    <Hitokoto />
  </div>
  <Background />
  <SettingsMain ref="settingPanel" />
  <Toast ref="toast" />
  <canvas id="canvas" class="hidden" />
</template>
