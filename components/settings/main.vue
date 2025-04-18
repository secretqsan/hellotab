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
  general: { label: 'settings.main.general', icon: "pi pi-cog", comp: GeneralSettings },
  search: { label: 'settings.main.search', icon: "pi pi-search", comp: SearchSettings },
  ai: { label: 'settings.main.ai', icon: "pi pi-sparkles", comp: AISettings },
  appearance: {
    label: 'settings.main.appearance',
    icon: "pi pi-palette",
    comp: AppearanceSettings,
  },
  widgets: { label: 'settings.main.widgets', icon: "pi pi-th-large", comp: WidgetsSettings },
  website: { label: 'settings.main.website', icon: "pi pi-globe", comp: WebsiteSettings },
  sync: { label: 'settings.main.sync', icon: "pi pi-cloud", comp: SyncSettings },
  about: { label: 'settings.main.about', icon: "pi pi-info-circle", comp: AboutSettings },
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
      <div 
        :class="[
          'bg-gray-100 h-full p-2 flex flex-col gap-1',
          $device.isDesktop || $device.isTablet ? 'w-1/4' : '',
        ]
      ">
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
            v-if="$device.isDesktop || $device.isTablet"
            >{{ $t(tab.label) }}</span
          >
        </div>
      </div>
      <div class="flex-1 w-0 h-full flex flex-col">
        <div class="flex flex-row">
          <h2 class="text-xl font-medium ml-8 mt-8 mb-0">
            {{ $t('settings.base') }} > {{ $t(settingTabs[activeSettingTab].label) }}
          </h2>
        </div>
        <div class="flex-1 p-4 overflow-y-auto">
          <component :is="settingTabs[activeSettingTab].comp" />
        </div>
      </div>
    </div>
  </Window>
</template>
