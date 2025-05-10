<script setup>
useHead({
  title: "HelloTab",
  meta: [
    { name: "keywords", content: "新标签页,标签页定制，效率工具" },
    {
      name: "description",
      content:
        "试用HelloTab。HelloTab是一款功能强大的浏览器新标签页，提供可定制的小组件、云端同步、智能搜索和个性化外观等特性，让你的浏览体验更加高效和个性化。",
    },
  ]
});
const settingStore = useSettingsStore();
const runtimeVariables = useRuntimeStore();
const { language } = storeToRefs(settingStore);
const { crxId, settingPanel, toast } = storeToRefs(runtimeVariables);
const { setLocale } = useI18n();
onMounted(() => {
  const body = document.getElementsByTagName("body")[0];
  const extensionDiv = body.querySelector("#extension");
  if (extensionDiv) {
    crxId.value = extensionDiv.innerHTML;
  }
  setLocale(language.value ?? "zh");
});
</script>

<template>
  <ConfigSyncHandler />

  <div
    class="z-10 p-4 h-screen w-screen flex flex-col gap-10 items-center relative"
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
          :to="'/intro?lang=' + language"
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
    <searchBox class="z-30 mb-10" />
    <WidgetsPanel class="flex-1 w-full" />
    <Hitokoto />
  </div>
  <Background />
  <SettingsMain ref="settingPanel" />
  <Toast ref="toast" />
  <canvas id="canvas" class="hidden" />
</template>
