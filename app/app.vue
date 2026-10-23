<script setup>
useHead({
  link: [{ rel: "icon", type: "image/svg+xml", href: "/icons/logo.svg" }],
});
</script>

<template>
  <div
    class="contents select-none dark:[color-scheme:dark]"
    @contextmenu.capture.prevent
  >
    <ThemeHandler />
    <NuxtPage />
  </div>
</template>
