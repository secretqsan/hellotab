<script setup>
import { Analytics } from "@vercel/analytics/nuxt";
import { SpeedInsights } from "@vercel/speed-insights/nuxt"
useHead({
  link: [{ rel: "icon", type: "image/x-icon", href: "/icons/512.png" }],
});
</script>

<template>
  <Analytics />
  <SpeedInsights />
  <NuxtPage />
</template>
