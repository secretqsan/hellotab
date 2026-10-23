<script setup>
const { appearance } = storeToRefs(useSettingsStore());

onMounted(() => {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

  const applyTheme = () => {
    const dark =
      appearance.value.theme === "auto"
        ? mediaQuery.matches
        : appearance.value.theme === "dark";
    document.documentElement.classList.toggle("dark", dark);
  };

  applyTheme();
  mediaQuery.addEventListener("change", applyTheme);
  watch(() => appearance.value.theme, applyTheme);

  onUnmounted(() => mediaQuery.removeEventListener("change", applyTheme));
});
</script>
<template>
  <div></div>
</template>
