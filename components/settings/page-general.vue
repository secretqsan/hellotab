<script setup>
import { file } from 'jszip';

const settings = useSettingsStore();
const fileInputRef = ref(null);
const { language } = storeToRefs(settings);
const languageOptions = [
  { label: "中文", value: "zh" },
  { label: "English", value: "en" },
  { label: "日本語", value: "ja" },
];
const { setLocale } = useI18n();
watch(
  () => language.value,
  (newLanguage, oldLanguage) => {
    setLocale(newLanguage);
  }
);
function resetConfigBtnClicked() {
  if (confirm('确定要重置所有配置吗？此操作不可恢复。')) {
    resetConfig();
  }
}
</script>

<template>
  <div class="p-4 space-y-6">
    <div class="flex items-center flex-row">
      <div class="text-md text-gray-600">{{ $t('settings.general.language') }}</div>
      <CustomPlaceholder />
      <select
        v-model="language"
        class="rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm focus:border-blue-500 focus:ring-blue-500 outline-none"
      >
        <option v-for="option in languageOptions" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>
    </div>
    <div 
      class="flex flex-col gap-3">
      <label class="text-md text-gray-600">{{ $t('settings.general.config') }}</label>
      <div class="flex flex-col gap-2">
        <custom-button
          class="w-full bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200"
          @click="saveConfigToZip">
          <div class="flex flex-row items-center justify-center gap-2">
            <i class="pi pi-file-export"></i>
            <span>{{ $t('settings.general.exportConfig') }}</span>
          </div>
        </custom-button>
        <input
          type="file"
          class="hidden"
          ref="fileInputRef"
          accept=".zip"
          @change="(event) => {
            const file = event.target.files[0];
            if (file) {
              loadConfigFromZip(file);
            }
          }"/>
        <custom-button
          class="w-full bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200"
          @click="fileInputRef.click()"
        >
          <div class="flex flex-row items-center justify-center gap-2">
            <i class="pi pi-file-import"></i>
            <span>{{ $t('settings.general.importConfig') }}</span>
          </div>
        </custom-button>
        <custom-button
          class="w-full bg-red-500 text-white hover:bg-red-600 transition-colors duration-200"
          @click="resetConfigBtnClicked"
        >
          <div class="flex flex-row items-center justify-center gap-2">
            <i class="pi pi-eraser"></i>
            <span>{{ $t('settings.general.reset') }}</span>
          </div>
        </custom-button>
      </div>
    </div>
  </div>
</template>
