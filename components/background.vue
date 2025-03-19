<script setup>
const props = defineProps(['backgroundUrl']);
</script>
<template>
    <div class="fixed top-0 left-0 h-screen w-screen">
      <img :src="backgroundUrl" class="w-full h-full object-cover object-center" />
    </div>
</template>