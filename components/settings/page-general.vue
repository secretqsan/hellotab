<script setup>
const settings = useSettingsStore();
const { language } = storeToRefs(settings);
const languageOptions = [
  { label: "中文", value: "zh" },
  { label: "English", value: "en" }
];
const { setLocale } = useI18n();
watch(
  () => language.value,
  (newLanguage, oldLanguage) => {
    setLocale(newLanguage);
  }
);
</script>

<template>
  <div class="p-4 space-y-6">
    <div class="flex items-center flex-row">
      <div class="text-md text-gray-600">{{ $t('menu.general.language') }}</div>
      <Placeholder />
      <select
        v-model="language"
        class="rounded-lg border border-gray-300 bg-gray-50 p-1 text-sm focus:border-blue-500 focus:ring-blue-500 outline-none"
      >
        <option v-for="option in languageOptions" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>
    </div>
  </div>
</template>
