<script setup>
import SearchSettings from "./page-search.vue";
import AppearanceSettings from "./page-appearence.vue";
import WidgetsSettings from "./page-widgets.vue";
import SyncSettings from "./page-sync.vue";
import AboutSettings from "./page-about.vue";
import AISettings from "./page-ai.vue";
import WebsiteSettings from "./page-website.vue";
import GeneralSettings from "./page-general.vue";
const activeSettingTab = ref("search");
const windowRef = ref(null);

const settingTabs = {
  general: { label: "常规", icon: "pi pi-cog", comp: GeneralSettings },
  search: { label: "搜索", icon: "pi pi-search", comp: SearchSettings },
  ai: { label: "AI", icon: "pi pi-sparkles", comp: AISettings },
  appearance: {
    label: "外观",
    icon: "pi pi-palette",
    comp: AppearanceSettings,
  },
  widgets: { label: "小组件", icon: "pi pi-th-large", comp: WidgetsSettings },
  website: { label: "网址导航", icon: "pi pi-globe", comp: WebsiteSettings },
  sync: { label: "同步", icon: "pi pi-cloud", comp: SyncSettings },
  about: { label: "关于", icon: "pi pi-info-circle", comp: AboutSettings },
};
const show = (tabName) => {
  activeSettingTab.value = tabName;
  windowRef.value.show();
};
defineExpose({
  show,
});
</script>
<template>
  <Window ref="windowRef">
    <div class="w-full h-full flex flex-row">
      <div class="w-1/4 bg-gray-100 h-full p-2 flex flex-col gap-1">
        <div
          v-for="(tab, key) in settingTabs"
          :key="key"
          @click="activeSettingTab = key"
          :class="[
            'flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors duration-200',
            activeSettingTab === key
              ? 'bg-white shadow-sm'
              : 'hover:bg-white/50',
          ]"
        >
          <i
            :class="[
              tab.icon,
              'text-lg',
              activeSettingTab === key ? 'text-blue-500' : 'text-gray-500',
            ]"
          ></i>
          <span
            :class="[
              activeSettingTab === key
                ? 'text-blue-500 font-medium'
                : 'text-gray-700',
              'whitespace-nowrap',
            ]"
            >{{ tab.label }}</span
          >
        </div>
      </div>
      <div class="flex-1 h-full flex flex-col">
        <div class="flex flex-row">
          <h2 class="text-xl font-medium ml-8 mt-8 mb-0">
            设置中心 > {{ settingTabs[activeSettingTab].label }}
          </h2>
        </div>
        <div class="flex-1 p-4 overflow-y-auto">
          <component :is="settingTabs[activeSettingTab].comp" />
        </div>
      </div>
    </div>
  </Window>
</template>
