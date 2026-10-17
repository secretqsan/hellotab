<script setup>
useHead({
  link: [{ rel: "icon", type: "image/svg+xml", href: "/icons/logo.svg" }],
});
</script>

<template>
  <div class="contents" @contextmenu.capture.prevent>
    <NuxtPage />
  </div>
</template>
