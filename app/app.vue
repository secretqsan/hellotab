<script setup>
import { Analytics } from "@vercel/analytics/nuxt";
import { SpeedInsights } from "@vercel/speed-insights/nuxt"
useHead({
  link: [{ rel: "icon", type: "image/svg+xml", href: "/icons/logo.svg" }],
});
</script>

<template>
  <Analytics />
  <SpeedInsights />
  <NuxtPage />
</template>
